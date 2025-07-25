// Carousel logic for Surface product showcase (shows 2 products at a time, loops infinitely)
document.addEventListener("DOMContentLoaded", function () {
    const products = window.products || [];
    const track = document.getElementById("carouselTrack");
    const dots = document.getElementById("carouselDots");
    const leftBtn = document.getElementById("carouselPrev");
    const rightBtn = document.getElementById("carouselNext");
    const visibleSlides = 3; // <<< CHANGE THIS if you want 1 or more
    let currentSlide = 0;
    let slideInterval;

    function specsShort(specs) {
        return [
            specs.Processor,
            specs.RAM,
            specs.Storage,
            specs.Display,
        ].filter(Boolean).join(" • ");
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

    // Calculate slide width (assumes all slides same width)
    function getSlideWidth() {
        const slide = track.querySelector('.carousel-slide');
        return slide ? (slide.offsetWidth + 26) : 0; // 26px gap/margin
    }

    // Set track width
    function updateTrackWidth() {
        track.style.width = `${products.length * getSlideWidth()}px`;
    }
    updateTrackWidth();
    window.addEventListener('resize', () => {
        updateTrackWidth();
        goToSlide(currentSlide);
    });

    // Dots: one per "page" (group of visibleSlides)
    const totalPages = Math.ceil(products.length / visibleSlides);
    dots.innerHTML = Array.from({length: totalPages}, (_, i) =>
        `<span class="carousel-dot${i===0?' active':''}" data-dot="${i}"></span>`
    ).join('');

    function goToSlide(idx) {
        // Wrap-around logic
        if (idx < 0) idx = totalPages - 1;
        if (idx >= totalPages) idx = 0;

        currentSlide = idx;
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${currentSlide * slideWidth * visibleSlides}px)`;
        dots.querySelectorAll('.carousel-dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
    }

    if (leftBtn) leftBtn.onclick = () => { goToSlide(currentSlide - 1); resetInterval(); };
    if (rightBtn) rightBtn.onclick = () => { goToSlide(currentSlide + 1); resetInterval(); };
    if (dots) dots.onclick = e => {
        const dot = e.target.closest(".carousel-dot");
        if (dot) { goToSlide(parseInt(dot.dataset.dot)); resetInterval(); }
    };

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4000);
    }
    resetInterval();

    window.addEventListener("resize", () => goToSlide(currentSlide));
    goToSlide(0);

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
                            .map(
                                ([k, v]) =>
                                    `<tr><td><b>${k}</b></td><td>${v}</td></tr>`
                            )
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
