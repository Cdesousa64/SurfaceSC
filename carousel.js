// Carousel logic for Surface product showcase
document.addEventListener("DOMContentLoaded", function() {
    // Assume products array is loaded from products.js
    const products = window.products || [];
    const track = document.getElementById("carouselTrack");
    const dots = document.getElementById("carouselDots");
    const leftBtn = document.querySelector(".carousel-arrow.left");
    const rightBtn = document.querySelector(".carousel-arrow.right");
    let currentSlide = 0;
    let slideInterval;
    
    // Simple specs for each slide
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
            <button class="view-details" onclick="window.showProductDetails && window.showProductDetails(${i})">View Details</button>
        </div>
    `).join('');

    // Render dots
    dots.innerHTML = products.map((_, i) =>
        `<span class="carousel-dot${i===0?' active':''}" data-dot="${i}"></span>`
    ).join('');

    function goToSlide(idx) {
        currentSlide = (idx + products.length) % products.length;
        track.style.transform = `translateX(-${currentSlide * (track.firstElementChild.offsetWidth + 26)}px)`;
        dots.querySelectorAll('.carousel-dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
    }

    leftBtn.onclick = () => { goToSlide(currentSlide-1); resetInterval(); }
    rightBtn.onclick = () => { goToSlide(currentSlide+1); resetInterval(); }
    dots.onclick = e => {
        const dot = e.target.closest('.carousel-dot');
        if(dot) { goToSlide(parseInt(dot.dataset.dot)); resetInterval(); }
    };

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => goToSlide(currentSlide+1), 4000);
    }
    resetInterval();

    window.addEventListener('resize', () => goToSlide(currentSlide));
    goToSlide(0);

    // Optional: Details logic (modal, etc.). Plug in as needed.
    window.showProductDetails = function(idx) {
        alert(products[idx].name + '\n\n' + Object.entries(products[idx].specs).map(([k,v]) => `${k}: ${v}`).join('\n'));
    };
});