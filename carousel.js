// Carousel logic for Surface product showcase (standalone version)
document.addEventListener("DOMContentLoaded", function() {
    const products = window.products || [];
    const track = document.getElementById("carouselTrack");
    const dots = document.getElementById("carouselDots");
    const leftBtn = document.getElementById("carouselPrev");   // Use IDs to match your HTML
    const rightBtn = document.getElementById("carouselNext");
    let currentSlide = 0;
    let slideInterval;

    function specsShort(specs) {
        return [
            specs.Processor,
            specs.RAM,
            specs.Storage,
            specs.Display
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

    // Set track width dynamically for all slides
    function updateTrackWidth() {
        if (track.firstElementChild) {
            track.style.width = `${products.length * (track.firstElementChild.offsetWidth + 26)}px`;
        }
    }
    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);

    // Render dots
    dots.innerHTML = products.map((_, i) =>
        `<span class="carousel-dot${i===0?' active':''}" data-dot="${i}"></span>`
    ).join('');

    function goToSlide(idx) {
        // Clamp idx between 0 and products.length-1
        currentSlide = Math.max(0, Math.min(idx, products.length - 1));
        track.style.transform = `translateX(-${currentSlide * (track.firstElementChild.offsetWidth + 26)}px)`;
        dots.querySelectorAll('.carousel-dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
    }

    if(leftBtn) leftBtn.onclick = () => { goToSlide(currentSlide-1); resetInterval(); };
    if(rightBtn) rightBtn.onclick = () => { goToSlide(currentSlide+1); resetInterval(); };
    if(dots) dots.onclick = e => {
        const dot = e.target.closest('.carousel-dot');
        if(dot) { goToSlide(parseInt(dot.dataset.dot)); resetInterval(); }
    };

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (currentSlide < products.length - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(0); // Optionally loop to first slide
            }
        }, 4000);
    }
    resetInterval();

    window.addEventListener('resize', () => goToSlide(currentSlide));
    goToSlide(0);

    // Standalone details modal logic
    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('.view-details');
        if (btn) {
            const idx = +btn.getAttribute('data-index');
            showProductDetails(idx);
        }
    });

    function showProductDetails(idx) {
        const p = products[idx];
        if(!p) return;
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:600px;">
                <span class="close-modal" style="position:absolute;right:2rem;top:2rem;font-size:2em;cursor:pointer;color:#0078d4;">&times;</span>
                <h2>${p.name}</h2>
                <img src="${p.image}" alt="${p.name}" style="max-width:200px;margin-bottom:16px;">
                <div>${p.shortDesc || ''}</div>
                <table class="comparison-table" style="margin-top:16px;">
                    <tbody>
                        ${Object.entries(p.specs).map(([k,v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.remove();
        });
        window.addEventListener('keydown', function esc(ev) {
            if (ev.key === "Escape") { modal.remove(); window.removeEventListener('keydown', esc);}
        });
    }
});
