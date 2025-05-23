//Global 
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
    //check for edit mode

    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert('that item already exists!');
            return;
        }
    }

    // create item DOM element
    addItemToDOM(newItem);
    // add item to local storage
    addItemToStorage(newItem);
    checkUI();

    itemInput.value = '';
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


function addItemToDOM(item) {
    // create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    //console.log(li.outerHTML);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //add li to the DOM
    itemList.appendChild(li);

}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    // add new item to array
    itemsFromStorage.push(item);

    //convert to json STRING and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage;

}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;
    // get all the list items then for each to remove edit mode
    itemList.querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
    itemInput.value = item.textContent;
    formBtn.style.backgroundColor = '#228b22'
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        //remove item from DOM
        item.remove();
    }
    //remove item from storage
    removeItemFromStorage(item.textContent)

    checkUI();

}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //reset to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        // firstChild (which is first list item)

    }
    localStorage.removeItem('items')
    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        //first child is text node

        if (itemName.indexOf(text) != -1) {
            //indexOf() returns -1 if false
            item.style.display = 'flex';
            //flex is the default display of the element
        } else {
            item.style.display = 'none';

        }
    });

}

function checkUI() {
    itemInput.value = '';
    //run inside the function so that when this function runs, then it takes the new items
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    //reset state
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

//intialise app
function init() {
    //event listener
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)
    checkUI();
}

init();