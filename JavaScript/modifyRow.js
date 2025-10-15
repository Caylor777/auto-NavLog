// modifyRow.js
// Hooks the + and - buttons to add/remove table rows safely.

(function () {
    const addBtn = document.getElementById('addPointButton');
    const removeBtn = document.getElementById('removePointButton');
    const tbody = document.getElementById('ouputTable');

    if (!addBtn || !removeBtn || !tbody) {
        console.warn('modifyRow.js: required elements not found.');
        return;
    }

    // Use the first row as the template. If none exists, do nothing.
    const templateRow = tbody.querySelector('tr');
    if (!templateRow) return;

    // Helper to clone the template row and sanitize ids
    function makeNewRow() {
        const newRow = templateRow.cloneNode(true);

        // For every element inside the row, clear values and remove ids to avoid duplicates
        newRow.querySelectorAll('[id]').forEach((el) => {
            // Remove id to avoid duplicates in the DOM
            el.removeAttribute('id');

            // If it's an input, clear the value and keep placeholder
            if (el.tagName.toLowerCase() === 'input') {
                el.value = '';
            }

            // If it's an output cell (like <th id="wcaOutput">), replace text with placeholders
            if (el.tagName.toLowerCase() === 'th' || el.tagName.toLowerCase() === 'td') {
                // Only reset textual outputs, keep header/input containers alone
                // We'll use placeholders based on the original template text if present
                const orig = el.getAttribute('data-placeholder');
                if (orig) el.textContent = orig;
                else {
                    // Common fallback: if it contains ':' (time), set --:--, else set --
                    if (el.textContent && el.textContent.includes(':')) el.textContent = '--:--';
                    else el.textContent = '--';
                }
            }
        });

        // Additionally, clear any inputs without id
        newRow.querySelectorAll('input').forEach((inp) => {
            inp.value = '';
        });

        return newRow;
    }

    // Before first use, store placeholder texts for non-input cells in the template using data-placeholder
    templateRow.querySelectorAll('th, td').forEach((cell) => {
        // store current text as placeholder for later clones
        const text = cell.textContent.trim();
        cell.setAttribute('data-placeholder', text || (cell.textContent.includes(':') ? '--:--' : '--'));
    });

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newRow = makeNewRow();
        tbody.appendChild(newRow);
    });

    removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const rows = tbody.querySelectorAll('tr');
        if (rows.length > 1) {
            // Remove the last row
            const last = rows[rows.length - 1];
            tbody.removeChild(last);
        } else if (rows.length === 1) {
            // If there's only one row left, clear its inputs and outputs instead of removing
            const only = rows[0];
            only.querySelectorAll('input').forEach((inp) => inp.value = '');
            only.querySelectorAll('th, td').forEach((cell) => {
                const ph = cell.getAttribute('data-placeholder');
                if (ph) cell.textContent = ph;
            });
        }
    });
})();