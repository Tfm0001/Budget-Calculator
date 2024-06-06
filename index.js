document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemNameInput = document.getElementById('item-name');
    const itemValueInput = document.getElementById('item-value');
    const itemList = document.getElementById('item-list');
    const totalValueDisplay = document.getElementById('total-value');
    let totalValue = 0;

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = itemNameInput.value;
        const itemValue = parseFloat(itemValueInput.value);
        addItem(itemName, itemValue);
        itemNameInput.value = '';
        itemValueInput.value = '';
    });

    function addItem(name, value) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="item-name">${name}</span>: $<span class="item-value">${value.toFixed(2)}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Remove</button>
        `;
        itemList.appendChild(listItem);

        totalValue += value;
        updateTotalValue();

        const editButton = listItem.querySelector('.edit-btn');
        const deleteButton = listItem.querySelector('.delete-btn');
        const itemNameElement = listItem.querySelector('.item-name');
        const itemValueElement = listItem.querySelector('.item-value');

        editButton.addEventListener('click', () => {
            editItem(listItem, itemNameElement, itemValueElement, value);
        });

        deleteButton.addEventListener('click', () => {
            removeItem(listItem, value);
        });
    }

    function editItem(item, nameElement, valueElement, oldValue) {
        const newName = prompt("Enter new name:", nameElement.textContent);
        const newValue = parseFloat(prompt("Enter new value:", valueElement.textContent));

        if (newName && !isNaN(newValue)) {
            nameElement.textContent = newName;
            valueElement.textContent = newValue.toFixed(2);

            totalValue -= oldValue;
            totalValue += newValue;
            updateTotalValue();

            // Update the old value for future edits
            oldValue = newValue;
        }
    }

    function removeItem(item, value) {
        itemList.removeChild(item);
        totalValue -= value;
        updateTotalValue();
    }

    function updateTotalValue() {
        totalValueDisplay.textContent = totalValue.toFixed(2);
    }
});
