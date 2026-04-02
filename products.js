const products = [
  {
    name: "Avon Black Suede",
    category: "Perfume",
    usage: "Use 2 to 3 sprays on skin or clothing from a short distance.",
    benefits: "Bold evening fragrance with warm character.",
    duration: "8 to 10 hours",
    price: "$22.00",
    image: "images/products/images (1).jfif"
  },
  {
    name: "Inuka Fresh Deodorant",
    category: "Deodorant",
    usage: "Apply on clean, dry underarms each morning before dressing.",
    benefits: "Controls odor, keeps skin feeling dry, and gives all-day freshness.",
    duration: "Up to 24 hours",
    price: "$8.50",
    image: "images/products/images (2).jfif"
  },
  {
    name: "Avon Floral Perfume",
    category: "Perfume",
    usage: "Spray on pulse points like wrists, neck, and behind ears.",
    benefits: "Soft floral signature scent ideal for work and daily wear.",
    duration: "6 to 8 hours",
    price: "$18.00",
    image: "images/products/images (3).jfif"
  },
  {
    name: "Sport Shield Deodorant",
    category: "Deodorant",
    usage: "Roll or spray underarms before workouts and busy outdoor routines.",
    benefits: "High-performance odor defense for active schedules.",
    duration: "Up to 24 hours",
    price: "$9.00",
    image: "images/products/images (4).jfif"
  },
  {
    name: "Inuka Cool Body Mist",
    category: "Body Mist",
    usage: "Mist generously over body after showering and as needed during the day.",
    benefits: "Quick refresh, light fragrance layer, and comfortable daytime feel.",
    duration: "4 to 6 hours",
    price: "$10.50",
    image: "images/products/images (5).jfif"
  },
  {
    name: "Avon Care Body Lotion",
    category: "Lotion",
    usage: "Apply after bathing to lock in moisture and softness.",
    benefits: "Hydrating body lotion with a light clean finish.",
    duration: "All day hydration",
    price: "$11.00",
    image: "images/products/images (6).jfif"
  }
];

const prevCard = document.getElementById("card-prev");
const activeCard = document.getElementById("card-active");
const nextCard = document.getElementById("card-next");
const details = document.getElementById("product-details");
const upButton = document.getElementById("showcase-up");
const downButton = document.getElementById("showcase-down");

const detailCategory = document.getElementById("detail-category");
const detailName = document.getElementById("detail-name");
const detailUsage = document.getElementById("detail-usage");
const detailBenefits = document.getElementById("detail-benefits");
const detailDuration = document.getElementById("detail-duration");
const detailPrice = document.getElementById("detail-price");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

let currentIndex = 0;
let isTransitioning = false;

function cardMarkup(product) {
  return `
    <img src="${product.image}" alt="${product.name}">
    <div class="showcase-overlay">
      <h4>${product.name}</h4>
    </div>
  `;
}

function render(index) {
  const total = products.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  prevCard.innerHTML = cardMarkup(products[prevIndex]);
  activeCard.innerHTML = cardMarkup(products[index]);
  nextCard.innerHTML = cardMarkup(products[nextIndex]);

  const product = products[index];
  detailCategory.textContent = product.category;
  detailName.textContent = product.name;
  detailUsage.textContent = product.usage;
  detailBenefits.textContent = product.benefits;
  detailDuration.textContent = product.duration;
  detailPrice.textContent = product.price;
}

function animateDetails() {
  details.classList.remove("is-entering");
  window.requestAnimationFrame(() => {
    details.classList.add("is-entering");
  });
}

function animateCards(direction) {
  activeCard.classList.remove("slide-up", "slide-down");
  prevCard.classList.remove("slide-up", "slide-down");
  nextCard.classList.remove("slide-up", "slide-down");

  const className = direction === "next" ? "slide-up" : "slide-down";
  activeCard.classList.add(className);
  prevCard.classList.add(className);
  nextCard.classList.add(className);
}

function move(direction) {
  if (isTransitioning) return;
  isTransitioning = true;

  animateCards(direction);

  currentIndex =
    direction === "next"
      ? (currentIndex + 1) % products.length
      : (currentIndex - 1 + products.length) % products.length;

  setTimeout(() => {
    render(currentIndex);
    activeCard.classList.remove("slide-up", "slide-down");
    prevCard.classList.remove("slide-up", "slide-down");
    nextCard.classList.remove("slide-up", "slide-down");
    animateDetails();
    isTransitioning = false;
  }, 1000);
}

upButton.addEventListener("click", () => move("prev"));
downButton.addEventListener("click", () => move("next"));

const showcase = document.getElementById("product-showcase");
showcase.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      move("next");
    } else {
      move("prev");
    }
  },
  { passive: false }
);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") move("next");
  if (event.key === "ArrowUp") move("prev");
});

render(currentIndex);
animateDetails();

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
