// Troque pelo número com DDI + DDD, só dígitos. Ex.: "5591999999999"
const WHATSAPP_NUMBER = "559180967765";

// Conteúdo retirado do PDF. Para trocar a foto, substitua o arquivo em /img.
const products = [
  { name: "Tradicional", price: 10, image: "tradicional.jpg",
    description: "Massa deliciosa de baunilha e com muitas gotas de chocolate" },
  { name: "Kinder bueno", price: 10, image: "kinder-bueno.jpg",
    description: "Massa de baunilha com gotas de chocolate branco e preto com recheio cremoso de Kinder bueno com uma apresentação impecável" },
  { name: "Kit kat", price: 10, image: "kit-kat.jpg",
    description: "Massa de chocolate com recheio cremoso de kit kat finalizado com uma peça do doce" },
  { name: "Torta cookie", price: 10, image: "torta-cookie.jpg",
    description: "Massa de baunilha com gotas de chocolate com delicioso recheio de brigadeiro ou Nutella." },
  { name: "Triplo chocolate", price: 10, image: "triplo-chocolate.jpg",
    description: "Massa de chocolate equilibrado com gotas de chocolate branco, ao leite e meio amargo." },
  { name: "Copo cookie", price: 10, image: "copo-cookie.jpg",
    description: "mini cookies de tradicionais com gotas e duplo creme para mergulhar." },
  { name: "Copo de Nutella", price: 8, image: "copo-nutella.jpg",
    description: "mini cookies de tradicionais com gotas e muuuuuita Nutella para de deliciar." }
];

const grid = document.getElementById("menu-grid");

function orderLink(name) {
  const text = `Olá! Gostaria de pedir o ${name}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function createCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img" data-file="img/${product.image}">
      <img src="img/${product.image}" alt="Foto do produto ${product.name}" loading="lazy">
    </div>
    <div class="card-body">
      <div class="card-head">
        <h3>${product.name}</h3>
        <span class="price">R$ ${product.price}</span>
      </div>
      <p>${product.description}</p>
      <button class="btn" type="button">Quero pedir</button>
    </div>`;

  const box = card.querySelector(".card-img");
  card.querySelector("img").addEventListener("error", () => box.classList.add("placeholder"));
  card.querySelector("button").addEventListener("click", () => {
    if (WHATSAPP_NUMBER === "SEU_NUMERO_AQUI") {
      alert("Configure o número do WhatsApp em js/script.js (WHATSAPP_NUMBER).");
      return;
    }
    window.open(orderLink(product.name), "_blank", "noopener");
  });
  return card;
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

products.forEach((product, i) => {
  const card = createCard(product);
  card.style.transitionDelay = `${(i % 4) * 80}ms`;
  grid.appendChild(card);
  observer.observe(card);
});
