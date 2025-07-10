// Comparison feature for Surface devices
document.addEventListener('DOMContentLoaded', function() {
  // Only run on Home tab if showcase is present
  const showcase = document.querySelector('.product-showcase');
  const openCompare = document.getElementById('openCompare');
  const compareModal = document.getElementById('compareModal');
  const closeCompare = document.getElementById('closeCompare');
  const compareBody = document.getElementById('compareBody');

  // If you use the new modal (as in the HTML you provided), use this logic:
  if (openCompare && compareModal && closeCompare && compareBody && window.products) {
    openCompare.addEventListener('click', function() {
      // Show all products for comparison (customize as needed)
      let html = '<table class="comparison-table"><thead><tr><th>Name</th>';
      window.products.forEach(p => html += `<th>${p.name}<br><img src="${p.image}" alt="${p.name}" style="max-width:80px;max-height:60px;margin-top:0.5em;"></th>`);
      html += '</tr></thead><tbody>';
      for (const key of Object.keys(window.products[0].specs)) {
        html += `<tr><td>${key}</td>`;
        window.products.forEach(p => html += `<td>${p.specs[key]}</td>`);
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
    // Optionally allow ESC key to close modal
    window.addEventListener('keydown', function(e) {
      if (e.key === "Escape") compareModal.style.display = 'none';
    });
  }

  // If you want the checkbox-based comparison instead (classic UI), uncomment below and remove the block above.
  /*
  if (showcase && window.products) {
    // Only show compare for the 4 workstation devices
    const compareDevices = [
      { ...products[0] },
      { ...products[1] },
      { ...products[2] },
      { ...products[3] }
    ];
    // Insert comparison UI
    const compareBox = document.createElement('div');
    compareBox.className = 'compare-box';
    compareBox.innerHTML = `
      <div id="productsGrid" class="products-grid"></div>
      <button id="compareBtn" class="compare-btn" disabled>Compare Devices</button>
      <div id="compareModal" class="modal">
        <div class="modal-content">
          <span class="close-modal" id="closeModal">&times;</span>
          <h2>Device Comparison</h2>
          <div id="comparisonTable"></div>
        </div>
      </div>
    `;
    showcase.parentElement.insertBefore(compareBox, showcase);

    // Hide original showcase for the 4 devices
    Array.from(showcase.children).forEach(card => {
      const title = card.querySelector('h2');
      if (
        title &&
        (
          title.textContent.includes('Surface Pro for Business 11th Edition') ||
          title.textContent.includes('Surface Laptop for Business 7th Edition') ||
          title.textContent.includes('New Surface Pro for Business 12') ||
          title.textContent.includes('New Surface Laptop for Business 13')
        )
      ) {
        card.style.display = 'none';
      }
    });

    // Product selection & compare modal logic
    const productsGrid = compareBox.querySelector('#productsGrid');
    const compareBtn = compareBox.querySelector('#compareBtn');
    const compareModal = compareBox.querySelector('#compareModal');
    const closeModal = compareBox.querySelector('#closeModal');
    const comparisonTable = compareBox.querySelector('#comparisonTable');
    let selected = [];

    function renderProducts() {
      productsGrid.innerHTML = '';
      compareDevices.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        card.innerHTML = `
          <input type="checkbox" class="select-checkbox" id="chk-${product.id}" />
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
        `;
        const checkbox = card.querySelector('.select-checkbox');
        checkbox.checked = selected.includes(product.id);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            if (selected.length >= 4) {
              checkbox.checked = false;
              return;
            }
            selected.push(product.id);
          } else {
            selected = selected.filter(id => id !== product.id);
          }
          updateSelectionUI();
        });
        card.addEventListener('click', (e) => {
          if (!e.target.classList.contains('select-checkbox')) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
          }
        });
        if (selected.includes(product.id)) card.classList.add('selected');
        productsGrid.appendChild(card);
      });
      updateSelectionUI();
    }

    function updateSelectionUI() {
      document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.productId;
        card.classList.toggle('selected', selected.includes(id));
        card.querySelector('.select-checkbox').checked = selected.includes(id);
      });
      compareBtn.disabled = selected.length < 2;
    }

    compareBtn.addEventListener('click', () => {
      showComparisonModal();
    });
    closeModal.addEventListener('click', () => {
      compareModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === compareModal) compareModal.style.display = 'none';
    });

    function showComparisonModal() {
      const selectedProducts = compareDevices.filter(p => selected.includes(p.id));
      const allSpecs = Object.keys(selectedProducts[0].specs);
      let html = `<table class="comparison-table"><thead><tr><th>Spec</th>`;
      selectedProducts.forEach(p => {
        html += `<th>${p.name}<br><img src="${p.image}" alt="${p.name}" style="max-width:80px;max-height:60px;margin-top:0.5em;"></th>`;
      });
      html += `</tr></thead><tbody>`;
      allSpecs.forEach(specKey => {
        const values = selectedProducts.map(p => p.specs[specKey]);
        const isDifferent = values.some((v, _, arr) => v !== arr[0]);
        html += `<tr><td>${specKey}</td>`;
        values.forEach(val => {
          html += `<td class="${isDifferent ? 'highlight' : ''}">${val || '-'}</td>`;
        });
        html += `</tr>`;
      });
      html += `</tbody></table>`;
      comparisonTable.innerHTML = html;
      compareModal.style.display = 'block';
    }

    renderProducts();
  }
  */

});
