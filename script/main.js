const products = [
  {
    id: 1,
    name: "Ecouteurs",
    price: 10000,
    category: "tech",
    img: "assets/img/ecouteurs.jpg",
    rating: 4
  },
  {
    id: 2,
    name: "Téléphone",
    price: 150000,
    category: "tech",
    img: "assets/img/phone.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Airprod",
    price: 100000,
    category: "tech",
    img: "assets/img/airprod.jpg",
    rating: 3
  },
  {
    id: 4,
    name: "Téléphone",
    price: 1200000,
    category: "tech",
    img: "assets/img/mobile.jpg",
    rating: 5
  },
  {
    id: 5,
    name: "Téléphone",
    price: 1200000,
    category: "tech",
    img: "assets/img/mobile1.jpg",
    rating: 4
  },
  {
    id: 6,
    name: "T-shirt",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/gallery-2.jpg",
    rating: 4
  },
  {
    id: 7,
    name: "T-shirt",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/gallery-3.jpg",
    rating: 3
  },
  {
    id: 8,
    name: "T-shirt",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/gallery-4.jpg",
    rating: 5
  },
  {
    id: 9,
    name: "Pantallon",
    price: 90000,
    category: "Vêtements",
    img: "assets/img/pantalonshoesgrey.jpg",
    rating: 4
  },
  {
    id: 10,
    name: "Montre",
    price: 70000,
    category: "tech",
    img: "assets/img/gadget.png",
    rating: 3
  },
  {
    id: 11,
    name: "Pantallon",
    price: 80000,
    category: "Vêtements",
    img: "assets/img/pantalonshoes.jpg",
    rating: 4
  },
  {
    id: 12,
    name: "Pull",
    price: 60000,
    category: "Vêtements",
    img: "assets/img/pulwoman.jpg",
    rating: 5
  },
  {
    id: 13,
    name: "Chaussures",
    price: 150000,
    category: "Vêtements",
    img: "assets/img/shoes.jpg",
    rating: 4
  },
  {
    id: 14,
    name: "Chaussures",
    price: 200000,
    category: "Vêtements",
    img: "assets/img/shoesgrey.jpg",
    rating: 3
  },
  {
    id: 15,
    name: "Chaussures",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/shoesjordan.jpg",
    rating: 5
  },
  {
    id: 16,
    name: "T-shirts",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/shoesman.jpg",
    rating: 4
  },
  {
    id: 17,
    name: "Chaussures",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/shoesred.jpg",
    rating: 5
  },
  {
    id: 18,
    name: "T-shirt",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/t-shirtappolo.jpg",
    rating: 3
  },
  {
    id: 19,
    name: "T-shirts",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/t-shirtblack.jpg",
    rating: 4
  },
  {
    id: 20,
    name: "T-shirts",
    price: 20000,
    category: "Vêtements",
    img: "assets/img/t-shirtred.jpg",
    rating: 5
  },
  {
    id: 21,
    name: "Montre",
    price: 20000,
    category: "tech",
    img: "assets/img/watch.jpg",
    rating: 4
  },
  {
    id: 22,
    name: "Montre",
    price: 20000,
    category: "tech",
    img: "assets/img/watchbalck.jpg",
    rating: 5
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const cartElement = document.getElementById("cart");
const cartIcon = document.getElementById("panie");

// Affiche les produits selon la catégorie
function displayProducts(category = "all") {
  productList.innerHTML = "";
  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    
    // Génération des étoiles pour l'évaluation
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        starsHTML += '<span class="star filled">★</span>';
      } else {
        starsHTML += '<span class="star">☆</span>';
      }
    }
    
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} GNF</p>
      <div class="rating">${starsHTML}</div>
      <button onclick="addToCart(${product.id})">Ajouter</button>
    `;
    productList.appendChild(div);
  });
}

// Ajoute un produit au panier
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  saveCart();
  renderCart();
}

// Retire un produit du panier via son index
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// Affiche les éléments du panier
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} GNF
      <button onclick="removeFromCart(${index})" title="Supprimer">
        <img src="assets/img/iconsup.jpg" alt="Supprimer" style="width: 20px; height: 20px; cursor: pointer; margin-left: 0px;"/>
      </button>
    `;
    cartItems.appendChild(li);
  });
  totalPrice.textContent = total;
  cartCount.textContent = cart.length;
}

// Sauvegarde le panier dans localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Toggle l'affichage du panier au clic sur l'icône panier
cartIcon.addEventListener("click", () => {
  if (cartElement.style.display === "block") {
    cartElement.style.display = "none";
  } else {
    cartElement.style.display = "block";
  }
});

// Filtrage par catégorie via les boutons
document.querySelectorAll(".filter-btn").forEach(btn =>
  btn.addEventListener("click", () =>
    displayProducts(btn.dataset.category)
  )
);

// Effet de réduction du header lors du défilement
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// Initialisation à l'ouverture de la page
displayProducts();
renderCart();
