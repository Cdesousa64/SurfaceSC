// main.js — includes carousel, video modal, and comparison logic for Surface showcase

document.addEventListener('DOMContentLoaded', function() {
  // ====== Carousel Logic ======
  const products = window.products || []; // Defined in products.js
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselDots = document.getElementById('carouselDots');
  let currentSlide = 0;

  // Render carousel slides
  function renderCarousel() {
    if (!carouselTrack || !products.length) return;
    carouselTrack.innerHTML = '';
    products.forEach((product, idx) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="slide-specs">${product.shortDesc || ''}</div>
        <button class="view-details" data-index="${idx}">View Details</button>
      `;
      carouselTrack.appendChild(slide);
    });
    updateCarousel();
    renderCarouselDots();
  }

  // Update carousel to show current slide
  function updateCarousel() {
    if (!carouselTrack) return;
    const slideWidth = carouselTrack.children[0]?.offsetWidth || 335;
    carouselTrack.style.transform = `translateX(-${currentSlide * (slideWidth + 26)}px)`;
    updateCarouselDots();
  }

  // Carousel navigation
  if (carouselPrev && carouselNext) {
    carouselPrev.addEventListener('click', function() {
      currentSlide = Math.max(0, currentSlide - 1);
      updateCarousel();
    });
    carouselNext.addEventListener('click', function() {
      currentSlide = Math.min(products.length - 1, currentSlide + 1);
      updateCarousel();
    });
  }

  // Carousel dots
  function renderCarouselDots() {
    if (!carouselDots) return;
    carouselDots.innerHTML = '';
    products.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (idx === currentSlide ? ' active' : '');
      dot.addEventListener('click', function() {
        currentSlide = idx;
        updateCarousel();
      });
      carouselDots.appendChild(dot);
    });
  }
  function updateCarouselDots() {
    if (!carouselDots) return;
    Array.from(carouselDots.children).forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  // Details modal logic
  document.body.addEventListener('click', function(e) {
    const btn = e.target.closest('.view-details');
    if (btn) {
      const idx = +btn.getAttribute('data-index');
      showDetailsModal(products[idx]);
    }
  });

  function showDetailsModal(product) {
    if (!product) return;
    // You can customize this modal as needed
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:600px;">
        <span class="close-modal" id="closeDetailsModal" style="position:absolute;right:2rem;top:2rem;font-size:2em;cursor:pointer;color:#0078d4;">&times;</span>
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" style="max-width:200px;margin-bottom:16px;">
        <div>${product.longDesc || product.shortDesc || ''}</div>
        <table class="comparison-table" style="margin-top:16px;">
          <tbody>
            ${Object.entries(product.specs).map(([k,v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#closeDetailsModal').addEventListener('click', () => {
      modal.remove();
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.remove();
    });
    window.addEventListener('keydown', function esc(ev) {
      if (ev.key === "Escape") { modal.remove(); window.removeEventListener('keydown', esc);}
    });
  }

  renderCarousel();

  // ====== Comparison Modal Logic ======
  const openCompare = document.getElementById('openCompare');
  const compareModal = document.getElementById('compareModal');
  const closeCompare = document.getElementById('closeCompare');
  const compareBody = document.getElementById('compareBody');

  if (openCompare && compareModal && closeCompare && compareBody && products.length) {
    openCompare.addEventListener('click', function() {
      // Show all products for comparison
      let html = '<table class="comparison-table"><thead><tr><th>Name</th>';
      products.forEach(p => html += `<th>${p.name}<br><img src="${p.image}" alt="${p.name}" style="max-width:80px;max-height:60px;margin-top:0.5em;"></th>`);
      html += '</tr></thead><tbody>';
      for (const key of Object.keys(products[0].specs)) {
        html += `<tr><td>${key}</td>`;
        products.forEach(p => html += `<td>${p.specs[key]}</td>`);
        html += '</tr>';
      }
      html += '</tbody></table>';
      compareBody.innerHTML = html;
      compareModal.style.display = 'block';
    });
    closeCompare.addEventListener('click', function() {
      compareModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
      if (e.target === compareModal) compareModal.style.display = 'none';
    });
    window.addEventListener('keydown', function(e) {
      if (e.key === "Escape") compareModal.style.display = 'none';
    });
  }
});
