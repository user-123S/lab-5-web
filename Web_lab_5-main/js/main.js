const shoes = [
    { id: 1, name: "Asics Onitsuka Tiger", price: 120, size: 42, color: "Black", image:"images/tiger.jpg"},
    { id: 2, name: "Adidas r71", price: 180, size: 45, color: "Black", image:"images/r71.webp"},
    { id: 3, name: "New Balance 574", price: 95, size: 41, color: "Dark Blue", image:"images/nike.jpg"},
    { id: 4, name: "Converse Chuck 70", price: 70, size: 39, color: "Black", image:"images/converse.jpg"},
    { id: 5, name: "Adidas Campus", price: 190, size: 40, color: "Gray", image:"images/campus.jpg"}
];

const shoelist = document.getElementById("shoe-list");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const countButton = document.getElementById("countButton");
const sortToggle = document.getElementById("sortToggle");
const total = document.getElementById("total");

function renderShoes(list) {
    shoelist.innerHTML = "";
    list.forEach(shoe => {
        shoelist.insertAdjacentHTML("beforeend", `
            <div class="shoe-card">
                <img class="shoe-img" src="${shoe.image}" alt="${shoe.name}">
                <h3>${shoe.name}</h3>
                <p>Size: ${shoe.size}</p>
                <p>${shoe.color}</p>
                <p>Price: $${shoe.price}</p>
            </div>
        `);
    });
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = shoes.filter(s => s.name.toLowerCase().includes(query));
    renderShoes(filtered);
});

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderShoes(shoes);
});

sortToggle.addEventListener("change", () => {
    let sorted = [...shoes];
    if (sortToggle.checked) {
        sorted.sort((a, b) => b.price - a.price);
    }
    renderShoes(sorted);
});

countButton.addEventListener("click", () => {
    const totalPrice = shoes.reduce((sum, s) => sum + s.price, 0);
    total.textContent = totalPrice;
});

renderShoes(shoes);
