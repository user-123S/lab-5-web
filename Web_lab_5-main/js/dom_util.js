export const EDIT_BUTTON_PREFIX = "edit-button-";

const titleInput = document.getElementById("title_input");
const itemsContainer = document.getElementById("items_container");
const colorInput = document.getElementById("color_input");
const sizeInput = document.getElementById("size_input");
const priceInput = document.getElementById("price_input");
const imgInput = document.getElementById("img_input");
const preview = document.getElementById("preview");

const itemTemplate = ({ id, name, size, color, price, image }) => `
    <div class="shoe-card" id="${id}">
        <img class="shoe-img" src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>Size: ${size}</p>
        <p>${color}</p>
        <p>Price: $${price}</p>
        <div class="shoe-card__buttons">
            <button id="${EDIT_BUTTON_PREFIX}${id}" class="edit-btn">Edit</button>
            <button class="delete-btn" data-remove="${id}">Delete</button>
        </div>
    </div>
`;

export const clearInputs = () => {
    titleInput.value = "";
    sizeInput.value = "";
    colorInput.value = "";
    priceInput.value = "";
    imgInput.value = "";
    preview.style.display = "none";

};

export const getInputValues = () => {
    return {
        name: titleInput.value,
        size: sizeInput.value,
        color: colorInput.value,
        price: priceInput.value,
        image: preview.src || "",
    };
};

export const addItemToPage = (item, onEditItem, onRemoveItem) => {
    itemsContainer.insertAdjacentHTML("beforeend", itemTemplate(item));

    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${item.id}`);
    const removeButton = document.querySelector(`[data-remove="${item.id}"]`);

    editButton.addEventListener("click", onEditItem);
    removeButton.addEventListener("click", () => onRemoveItem(item.id));

};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
    itemsContainer.innerHTML = "";
    for (const item of items) {
        addItemToPage(item, onEditItem, onRemoveItem);
    }
};

