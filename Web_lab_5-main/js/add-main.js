import {
    EDIT_BUTTON_PREFIX,
    clearInputs,
    renderItemsList,
    getInputValues,
} from "./dom_util.js";

import {getAllShoes, postShoes, deleteShoes, editShoes} from "./api.js"

const submitButton = document.getElementById("submit_button");
const imgInput = document.getElementById("img_input");
const preview = document.getElementById("preview");

let shoes = [];
let editingShoe = null; 

const refetchAllShoes = async () => {
    const allShoes = await getAllShoes();

    shoes = allShoes;

    renderItemsList(shoes, onEditItem, onRemoveItem);
}

imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

const onRemoveItem = (id) => {
    deleteShoes(id).then(refetchAllShoes);;
};

const onEditItem = (e) => {
    const id = e.target.id.replace(EDIT_BUTTON_PREFIX, "");
    const shoe = shoes.find((s) => s.id === id);
    if (!shoe) return;

    editingShoe = shoe;

    document.getElementById("title_input").value = shoe.name;
    document.getElementById("size_input").value = shoe.size;
    document.getElementById("color_input").value = shoe.color;
    document.getElementById("price_input").value = shoe.price;
    preview.src = shoe.image;
    preview.style.display = "block";
    submitButton.textContent = "Update Shoe";
};

const onSubmit = (event) => {
    event.preventDefault();
    const newValues = getInputValues();
    
    if (!newValues.name.trim()) {
        alert("Please fill in name field!");
        return;
    }

    if (!newValues.size.trim()) {
        alert("Please fill in size field!");
        return;
    }

    if (!/^\d+$/.test(newValues.size)) { 
        alert("Size must be a number!");
        return;
    }

    if (!newValues.color.trim()) {
        alert("Please fill in color field!");
        return;
    }

    if (!/^[a-zA-Z]+$/.test(newValues.color)) { 
        alert("Color must contain only letters!");
        return;
    }

    if (!newValues.price.trim()) {
        alert("Please fill in price field!");
        return;
    }

    if (!/^\d+$/.test(newValues.price)) {  
        alert("Price must be a number!");
        return;
    }

    if (!newValues.image || newValues.image === "") {
        alert("Please select an image!");
        return;
    }

    if (editingShoe) {
        editShoes(editingShoe.id, newValues).then(refetchAllShoes);
        editingShoe = null;
        submitButton.textContent = "Submit";
    } else {
        postShoes(newValues).then(refetchAllShoes);
    }

    clearInputs();
};

submitButton.addEventListener("click", onSubmit);

refetchAllShoes();
