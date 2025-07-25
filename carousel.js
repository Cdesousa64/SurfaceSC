document.addEventListener("DOMContentLoaded", function () {
    const products = window.products || [];
    const track = document.getElementById("carouselTrack");
    const dots = document.getElementById("carouselDots");
    const leftBtn = document.getElementById("carouselPrev");
    const rightBtn = document.getElementById("carouselNext");
    const visibleSlides = 2; // Number of cards visible at once
    let currentPage = 0;
    let slideInterval;

    function specsShort(specs) {
        return [specs.Processor, specs.RAM, specs.Storage, specs.Display]
            .filter(Boolean)
            .join(" • ");
    }

    // Render slides
    track.innerHTML = products.map((p, i) => `
        <div class="carousel-slide" data-index="${i}">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="slide-specs">${specsShort(p.specs)}</div>
            <button class="view-details" data-index="${i}">View Details</button>
        </div>
    `).join('');

    // Function to get slide width (all slides assumed same width)
    function getSlideWidth() {
        const slide = track.querySelector('.carousel-slide');
        if (!slide) return 0;
        // Use gap as defined in your CSS for desktop/mobile
        const gap = parseInt(getComputedStyle(track).gap || '40', 10);
        return slide.offsetWidth + gap;
    }

    // Set track width for all slides
    function updateTrackWidth() {
        const slideWidth = getSlideWidth();
        track.style.width = `${products.length * slideWidth}px`;
    }
    updateTrackWidth();
    window.addEventListener('resize', () => {
        updateTrackWidth();
        goToPage(currentPage);
    });

    // Pages: one page per group of visibleSlides
    const totalPages = Math.ceil(products.length / visibleSlides);
    dots.innerHTML = Array.from({length: totalPages}, (_, i) =>
        `<span class="carousel-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></span>`
    ).join('');

    function goToPage(page) {
        // Infinite loop
        if (page < 0) page = totalPages - 1;
        if (page >= totalPages) page = 0;
        currentPage = page;
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${currentPage * visibleSlides * slideWidth}px)`;
        dots.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentPage));
    }

    if (leftBtn) leftBtn.onclick = () => { goToPage(currentPage - 1); resetInterval(); };
    if (rightBtn) rightBtn.onclick = () => { goToPage(currentPage + 1); resetInterval(); };
    if (dots) dots.onclick = e => {
        const dot = e.target.closest(".carousel-dot");
        if (dot) { goToPage(parseInt(dot.dataset.dot)); resetInterval(); }
    };

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToPage(currentPage + 1);
        }, 4000);
    }
    resetInterval();

    window.addEventListener("resize", () => goToPage(currentPage));
    goToPage(0);

    // Details modal logic (unchanged)
    document.body.addEventListener("click", function (e) {
        const btn = e.target.closest(".view-details");
        if (btn) {
            const idx = +btn.getAttribute("data-index");
            showProductDetails(idx);
        }
    });

    function showProductDetails(idx) {
        const p = products[idx];
        if (!p) return;
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.style.display = "block";
        modal.innerHTML = `
            <div class="modal-content" style="max-width:600px;">
                <span class="close-modal" style="position:absolute;right:2rem;top:2rem;font-size:2em;cursor:pointer;color:#0078d4;">&times;</span>
                <h2>${p.name}</h2>
                <img src="${p.image}" alt="${p.name}" style="max-width:200px;margin-bottom:16px;">
                <div>${p.shortDesc || ""}</div>
                <table class="comparison-table" style="margin-top:16px;">
                    <tbody>
                        ${Object.entries(p.specs)
                            .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`)
                            .join("")}
                    </tbody>
                </table>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector(".close-modal").addEventListener("click", () => {
            modal.remove();
        });
        modal.addEventListener("click", function (e) {
            if (e.target === modal) modal.remove();
        });
        window.addEventListener("keydown", function esc(ev) {
            if (ev.key === "Escape") {
                modal.remove();
                window.removeEventListener("keydown", esc);
            }
        });
    }
});
