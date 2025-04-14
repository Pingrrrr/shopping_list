//Global 
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    //console.log(li.outerHTML);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //add li to the DOM
    itemList.appendChild(li);
    console.log(li.outerHTML);

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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            //parent element button and another parent element which is list item 
        }

    }
    checkUI();

}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        // firstChild (which is first list item)
        checkUI();
    }

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
    //run inside the function so that when this function runs, then it takes the new items
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

checkUI();

//event listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);