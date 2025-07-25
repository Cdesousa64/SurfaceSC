document.addEventListener('DOMContentLoaded', function() {
  function setupCarousel() {
    const products = window.products || [];
    if (!products.length) {
      // Wait until products are loaded
      return setTimeout(setupCarousel, 100);
    }
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDots = document.getElementById('carouselDots');
    const visibleSlides = 2;
    let currentPage = 0;
    let slideInterval;

    function renderCarousel() {
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

    function getSlideWidth() {
      const slide = carouselTrack.querySelector('.carousel-slide');
      if (!slide) return 0;
      let gap = 40;
      if (window.innerWidth <= 900) gap = 18;
      if (window.innerWidth <= 700) gap = 0;
      return slide.offsetWidth + gap;
    }

    function getTotalPages() {
      return Math.ceil(products.length / visibleSlides);
    }

    function updateCarousel() {
      const slideWidth = getSlideWidth();
      const totalPages = getTotalPages();
      if (currentPage < 0) currentPage = totalPages - 1;
      if (currentPage >= totalPages) currentPage = 0;
      carouselTrack.style.transform = `translateX(-${currentPage * visibleSlides * slideWidth}px)`;
      updateCarouselDots();
    }

    function renderCarouselDots() {
      carouselDots.innerHTML = '';
      const totalPages = getTotalPages();
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === currentPage ? ' active' : '');
        dot.addEventListener('click', function() {
          currentPage = i;
          updateCarousel();
          resetInterval();
        });
        carouselDots.appendChild(dot);
      }
    }
    function updateCarouselDots() {
      Array.from(carouselDots.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentPage);
      });
    }

    if (carouselPrev) carouselPrev.onclick = function() {
      currentPage--;
      updateCarousel();
      resetInterval();
    };
    if (carouselNext) carouselNext.onclick = function() {
      currentPage++;
      updateCarousel();
      resetInterval();
    };

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        currentPage++;
        updateCarousel();
      }, 4000);
    }

    window.addEventListener('resize', () => updateCarousel());

    renderCarousel();
    resetInterval();
    updateCarousel();

    // ====== Spec Details Modal ======
    document.body.addEventListener('click', function(e) {
      const btn = e.target.closest('.view-details');
      if (btn) {
        const idx = +btn.getAttribute('data-index');
        showDetailsModal(products[idx]);
      }
    });

    function showDetailsModal(product) {
      if (!product) return;
      let specRows = '';
      Object.entries(product.specs).forEach(([k, v]) => {
        if (k === "Spec Sheet") return;
        specRows += `<tr>
          <td class="spec-label"><b>${k}</b></td>
          <td>${v}</td>
        </tr>`;
      });
      let specSheetRow = '';
      if (product.specs["Spec Sheet"]) {
        specSheetRow = `<tr><td></td><td>${product.specs["Spec Sheet"]}</td></tr>`;
      }
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.style.display = 'block';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal" id="closeDetailsModal" style="position:absolute;right:2rem;top:2rem;font-size:2em;cursor:pointer;color:#0078d4;">&times;</span>
          <h2>${product.name}</h2>
          <img src="${product.image}" alt="${product.name}" style="max-width:200px;margin-bottom:16px;">
          <div style="margin-bottom:18px;">${product.longDesc || product.shortDesc || ''}</div>
          <table class="comparison-table">
            <tbody>
              ${specRows}
              ${specSheetRow}
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

    // ====== Comparison Modal Logic ======
    const openCompare = document.getElementById('openCompare');
    const compareModal = document.getElementById('compareModal');
    const closeCompare = document.getElementById('closeCompare');
    const compareBody = document.getElementById('compareBody');

    if (openCompare && compareModal && closeCompare && compareBody && products.length) {
      openCompare.addEventListener('click', function() {
        const specKeys = Array.from(
          new Set(products.flatMap(p => Object.keys(p.specs)))
        );
        let html = `<table class="comparison-table">
          <thead>
            <tr>
              <th>Name</th>
              ${products.map(p => `<th>
                ${p.name}<br>
                <img src="${p.image}" alt="${p.name}" style="max-width:80px;max-height:60px;margin-top:0.5em;">
              </th>`).join('')}
            </tr>
          </thead>
          <tbody>
        `;
        for (const key of specKeys) {
          let label = key === 'Warranty' ? 'Manufacturing Warranty' : key;
          if (key === "Spec Sheet") {
            html += `<tr><td></td>`;
            products.forEach(p => {
              html += `<td>${p.specs[key] || ''}</td>`;
            });
            html += `</tr>`;
          } else {
            html += `<tr><td>${label}</td>`;
            products.forEach(p => {
              html += `<td>${p.specs[key] || ''}</td>`;
            });
            html += `</tr>`;
          }
        }
        html += `</tbody></table>`;
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
  }

  setupCarousel();
});
