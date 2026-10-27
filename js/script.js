// Troque pelo número com DDI + DDD, só dígitos. Ex.: "5591999999999"
const WHATSAPP_NUMBER = "559180967765";

// Link da loja no iFood
const IFOOD_URL = "https://www.ifood.com.br/delivery/ananindeua-pa/dolce-belly-doceria-cidade-nova/1606f21b-e356-42de-b28c-75250810105e?UTM_Medium=share";

// ─── CATÁLOGOS ────────────────────────────────────────────────────────────────

const cookies = [
  {
    name: "Tradicional",
    price: 10,
    image: "tradicional.jpg",
    description: "Massa deliciosa de baunilha com muitas gotas de chocolate."
  },
  {
    name: "Kinder Bueno",
    price: 12,
    image: "kinder-bueno.jpg",
    description: "Massa de baunilha com gotas de chocolate branco e preto, recheio cremoso de Kinder Bueno."
  },
  {
    name: "Kit Kat",
    price: 12,
    image: "kit-kat.jpg",
    description: "Massa de chocolate com recheio cremoso de Kit Kat, finalizado com uma peça do doce."
  },
  {
    name: "Torta Cookie",
    price: 12,
    image: "torta-cookie.jpg",
    description: "Massa de baunilha com gotas de chocolate e delicioso recheio de brigadeiro ou Nutella."
  },
  {
    name: "Triplo Chocolate",
    price: 12,
    image: "triplo-chocolate.jpg",
    description: "Massa de chocolate com gotas de chocolate branco, ao leite e meio amargo."
  },
  {
    name: "Copo Cookie",
    price: 12,
    image: "copo-cookie.jpg",
    description: "Mini cookies tradicionais com gotas e duplo creme para mergulhar."
  },
  {
    name: "Copo de Nutella",
    price: 8,
    image: "copo-nutella.jpg",
    description: "Mini cookies tradicionais com gotas e muuuuuita Nutella para se deliciar."
  },
  {
    name: "Empadinha de Cookie",
    price: 4.9,
    image: "empadinha-cookie.jpg",
    description: "Crocante por fora, macia por dentro — a combinação perfeita de empada e cookie."
  }
];

const brownies = [
  {
    name: "Brownie Clássico",
    price: 6,
    image: "brownie-classico.jpg",
    description: "Brownie denso e fudgy de chocolate meio amargo, crocante por fora e derretendo por dentro."
  },
  {
    name: "Brownie Recheado",
    price: 8,
    image: "brownie-recheado.jpg",
    description: "Peça um dos nossos maravilhosos sabores."
  },
  {
    name: "Afogadinho de Brownie",
    price: 9,
    image: "Afogadinho-brownie.jpg",
    description: "Afogadinho cremosso e delicioso feito de ninho e brigadeiro."
  },
  {
    name: "Escondidinho de Brownie",
    price: 12,
    image: "afogadinho-brownie.jpg",
    description: "Brownie denso e fudgy de chocolate meio amargo, crocante por fora e derretendo por dentro."
  },
  
];
const bolos = [
  { name:"Bolo Vulcão de Kinder Bueno", 
    price:16, 
    image:"bolo-vulcao-kinder.jpg", 
    description:"Coberto com um recheio cremoso que deixa cada colherada ainda mais irresistível."},
  ];

// Adicione novas categorias aqui seguindo o mesmo padrão:
// const bolos = [ { name, price, image, description }, ... ];

// ─── CATÁLOGO GERAL (usado na página de pedidos) ──────────────────────────────

const catalog = [
  { category: "Cookies", items: cookies },
  { category: "Brownies", items: brownies },
  { category: "Bolos", items: bolos }
  // { category: "Bolos", items: bolos },
];

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function orderLink(name) {
  const text = `Olá! Gostaria de pedir: ${name}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ─── RENDERIZAÇÃO DO CARDÁPIO ─────────────────────────────────────────────────

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function createCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img" data-file="img/${product.image}">
      <img src="img/${product.image}" alt="Foto de ${product.name}" loading="lazy">
    </div>
    <div class="card-body">
      <div class="card-head">
        <h3>${product.name}</h3>
        <span class="price">${formatPrice(product.price)}</span>
      </div>
      <p>${product.description}</p>
      <button class="btn" type="button">Quero pedir</button>
    </div>`;

  const imgBox = card.querySelector(".card-img");
  card.querySelector("img").addEventListener("error", () => imgBox.classList.add("placeholder"));
  card.querySelector("button").addEventListener("click", () => {
    window.open(IFOOD_URL, "_blank", "noopener");
  });
  return card;
}

/**
 * Renderiza uma seção completa de categoria dentro de um container.
 * @param {string} categoryName  - Nome exibido como título da seção (ex.: "Cookies")
 * @param {Array}  items         - Array de produtos da categoria
 * @param {HTMLElement} container - Elemento pai onde a seção será inserida
 */
function renderSection(categoryName, items, container) {
  // Wrapper da seção
  const section = document.createElement("div");
  section.className = "product-section";
  section.id = `sec-${categoryName.toLowerCase().replace(/\s+/g, "-")}`;

  // Título da seção
  const title = document.createElement("h3");
  title.className = "section-title";
  title.textContent = categoryName;
  section.appendChild(title);

  // Grid dos cards
  const grid = document.createElement("div");
  grid.className = "grid";

  items.forEach((product, i) => {
    const card = createCard(product);
    card.style.transitionDelay = `${(i % 4) * 80}ms`;
    grid.appendChild(card);
    observer.observe(card);
  });

  section.appendChild(grid);
  container.appendChild(section);
}

// ─── INICIALIZAÇÃO DO CARDÁPIO ────────────────────────────────────────────────

const menuContainer = document.getElementById("menu-sections");

if (menuContainer) {
  catalog.forEach(({ category, items }) => {
    renderSection(category, items, menuContainer);
  });
}

// ─── LÓGICA DA PÁGINA DE PEDIDOS ──────────────────────────────────────────────

const orderForm = document.getElementById("order-form");

if (orderForm) {
  // Popula o select de produtos
  const productSelect = document.getElementById("order-product");
  if (productSelect) {
    catalog.forEach(({ category, items }) => {
      const group = document.createElement("optgroup");
      group.label = category;
      items.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = `${p.name} — ${formatPrice(p.price)}`;
        opt.dataset.price = p.price;
        group.appendChild(opt);
      });
      productSelect.appendChild(group);
    });
  }

  // Atualiza o preço unitário ao mudar o produto
  const qtyInput    = document.getElementById("order-qty");
  const totalSpan   = document.getElementById("order-total");
  const priceSpan   = document.getElementById("order-unit-price");

  function updateTotal() {
    const selected = productSelect.options[productSelect.selectedIndex];
    const price    = parseFloat(selected?.dataset.price || 0);
    const qty      = parseInt(qtyInput?.value || 1, 10);
    if (priceSpan) priceSpan.textContent = formatPrice(price);
    if (totalSpan) totalSpan.textContent = formatPrice(price * qty);
  }

  productSelect?.addEventListener("change", updateTotal);
  qtyInput?.addEventListener("input", updateTotal);
  updateTotal();

  // Envio do formulário → WhatsApp
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = document.getElementById("order-name")?.value.trim();
    const phone   = document.getElementById("order-phone")?.value.trim();
    const product = productSelect?.value;
    const qty     = qtyInput?.value || 1;
    const obs     = document.getElementById("order-obs")?.value.trim();
    const address = document.getElementById("order-address")?.value.trim();

    if (!name || !product) return;

    const selected  = productSelect.options[productSelect.selectedIndex];
    const unitPrice = parseFloat(selected?.dataset.price || 0);
    const total     = formatPrice(unitPrice * parseInt(qty, 10));

    let msg = `Olá! Gostaria de fazer um pedido 🍪\n\n`;
    msg    += `*Nome:* ${name}\n`;
    if (phone)   msg += `*Telefone:* ${phone}\n`;
    msg    += `*Produto:* ${product}\n`;
    msg    += `*Quantidade:* ${qty}\n`;
    msg    += `*Total:* ${total}\n`;
    if (address) msg += `*Endereço:* ${address}\n`;
    if (obs)     msg += `*Observações:* ${obs}\n`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
}
