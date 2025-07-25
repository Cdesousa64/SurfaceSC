// main.js — includes carousel, video modal, and comparison logic for Surface showcase

document.addEventListener('DOMContentLoaded', function() {
  // ====== Carousel Logic ======
  const products = window.products || [];
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

  // Show 2 tiles at a time, scroll by 1
  function updateCarousel() {
    if (!carouselTrack) return;
    const slideWidth = 335;
    const gap = 40;
    // Don't scroll beyond the last full pair
    currentSlide = Math.max(0, Math.min(currentSlide, products.length - 2));
    carouselTrack.style.transform = `translateX(-${currentSlide * (slideWidth + gap)}px)`;
    updateCarouselDots();
  }

  // Carousel navigation (scroll by 1, but don't scroll past the last pair)
  if (carouselPrev) carouselPrev.addEventListener('click', function() {
    currentSlide = Math.max(0, currentSlide - 1);
    updateCarousel();
  });
  if (carouselNext) carouselNext.addEventListener('click', function() {
    currentSlide = Math.min(products.length - 2, currentSlide + 1);
    updateCarousel();
  });

  // Carousel dots for each pair (so last pair is always full tiles)
  function renderCarouselDots() {
    if (!carouselDots) return;
    carouselDots.innerHTML = '';
    // Number of dots = products.length - 1 (for pairs)
    for (let i = 0; i < products.length - 1; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
      dot.addEventListener('click', function() {
        currentSlide = i;
        updateCarousel();
      });
      carouselDots.appendChild(dot);
    }
  }
  function updateCarouselDots() {
    if (!carouselDots) return;
    Array.from(carouselDots.children).forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  // Details modal logic (updated: removed inline max-width style)
  document.body.addEventListener('click', function(e) {
    const btn = e.target.closest('.view-details');
    if (btn) {
      const idx = +btn.getAttribute('data-index');
      showDetailsModal(products[idx]);
    }
  });

  function showDetailsModal(product) {
    if (!product) return;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal" id="closeDetailsModal" style="position:absolute;right:2rem;top:2rem;font-size:2em;cursor:pointer;color:#0078d4;">&times;</span>
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" style="max-width:200px;margin-bottom:16px;">
        <div>${product.longDesc || product.shortDesc || ''}</div>
        <table class="comparison-table" style="margin-top:16px;">
          <tbody>
            ${Object.entries(product.specs).map(([k,v]) => {
              if (k === "Spec Sheet") {
                return `<tr><td></td><td>${v}</td></tr>`;
              }
              return `<tr><td><b>${k}</b></td><td>${v}</td></tr>`;
            }).join('')}
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
      // Gather all unique spec keys across products
      const specKeys = Array.from(
        new Set(products.flatMap(p => Object.keys(p.specs)))
      );
      let html = '<table class="comparison-table"><thead><tr><th>Name</th>';
      products.forEach(p => html += `<th>${p.name}<br><img src="${p.image}" alt="${p.name}" style="max-width:80px;max-height:60px;margin-top:0.5em;"></th>`);
      html += '</tr></thead><tbody>';
      for (const key of specKeys) {
        let label = key === 'Warranty' ? 'Manufacturing Warranty' : key;
        html += `<tr><td>${label === "Spec Sheet" ? "" : label}</td>`;
        products.forEach(p => {
          const v = p.specs[key] || '';
          if (key === "Spec Sheet" && v) {
            html += `<td>${v}</td>`;
          } else {
            html += `<td>${v}</td>`;
          }
        });
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
