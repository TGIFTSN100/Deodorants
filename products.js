const products = [
  {
    name: "Inuka Fresh Deodorant",
    category: "Deodorant",
    usage: "Apply on clean, dry underarms each morning before dressing.",
    benefits: "Controls odor, keeps skin feeling dry, and gives all-day freshness.",
    duration: "Up to 24 hours",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Avon Floral Perfume",
    category: "Perfume",
    usage: "Spray on pulse points like wrists, neck, and behind ears.",
    benefits: "Soft floral signature scent ideal for work and daily wear.",
    duration: "6 to 8 hours",
    price: "$18.00",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Avon Black Suede",
    category: "Perfume",
    usage: "Use 2 to 3 sprays on skin or clothing from a short distance.",
    benefits: "Adds a bold, warm scent profile suitable for evening occasions.",
    duration: "8 to 10 hours",
    price: "$22.00",
    image: "https://images.unsplash.com/photo-1595425964072-6e28f9f82955?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Inuka Cool Body Mist",
    category: "Body Mist",
    usage: "Mist generously over body after showering and as needed during the day.",
    benefits: "Quick refresh, light fragrance layer, and comfortable daytime feel.",
    duration: "4 to 6 hours",
    price: "$10.00",
    image: "https://images.unsplash.com/photo-1610465299993-e6675c9f9efa?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Men Sport Deodorant",
    category: "Deodorant",
    usage: "Roll or spray underarms before workouts and busy outdoor routines.",
    benefits: "High-performance odor defense for active schedules.",
    duration: "Up to 24 hours",
    price: "$9.00",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59a16?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Women Elegance Perfume",
    category: "Perfume",
    usage: "Apply lightly to pulse points and hair ends for a soft trail.",
    benefits: "Elegant scent character that feels polished and feminine.",
    duration: "7 to 9 hours",
    price: "$24.00",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Classic Oud Perfume",
    category: "Perfume",
    usage: "One to two sprays are enough due to rich concentrated notes.",
    benefits: "Deep woody profile that creates a luxury statement.",
    duration: "10 to 12 hours",
    price: "$28.00",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Citrus Burst Body Mist",
    category: "Body Mist",
    usage: "Spray after shower or midday for quick freshness.",
    benefits: "Energizing citrus uplift with a clean, bright finish.",
    duration: "4 to 5 hours",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Midnight Velvet Perfume",
    category: "Perfume",
    usage: "Spritz pulse points before dinners, events, or special nights.",
    benefits: "Sensual long-wear fragrance with smooth evening depth.",
    duration: "9 to 11 hours",
    price: "$30.00",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80"
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
