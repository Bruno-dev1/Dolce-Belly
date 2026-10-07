# Dolcebelly Doces — Cardápio Online

Cardápio digital para a **Dolcebelly Doces** ([@Dolcebelly.doces](https://www.instagram.com/dolcebelly.doces)), uma confeitaria artesanal especializada em cookies. A página exibe os produtos disponíveis e permite que o cliente faça o pedido diretamente pelo WhatsApp.

---

## Funcionalidades

- Listagem de produtos com foto, descrição e preço
- Botão "Quero pedir" que abre o WhatsApp com mensagem pré-preenchida
- Animação de entrada dos cards ao rolar a página (Intersection Observer)
- Layout responsivo — 1, 2, 3 ou 4 colunas dependendo da tela
- Fallback visual caso a imagem do produto não carregue
- Respeita a preferência `prefers-reduced-motion` para acessibilidade

---

## Estrutura do projeto

```
Dolce Belly/
├── index.html        # Estrutura da página
├── css/
│   └── style.css     # Estilos e responsividade
├── js/
│   └── script.js     # Dados dos produtos e lógica dos cards
└── img/              # Fotos dos produtos e assets
```

---

## Como usar

O projeto é estático — basta abrir o `index.html` no navegador. Não precisa de servidor ou dependências.

### Configurar o número do WhatsApp

Abra `js/script.js` e troque o valor de `WHATSAPP_NUMBER` pelo número completo com DDI e DDD, só dígitos:

```js
const WHATSAPP_NUMBER = "5591XXXXXXXXX";
```

### Adicionar ou editar produtos

Os produtos ficam no array `products` dentro de `js/script.js`. Cada item segue esse formato:

```js
{ name: "Nome do produto", price: 10, image: "nome-da-foto.jpg", description: "Descrição do produto" }
```

Coloque a foto correspondente dentro da pasta `img/`.

---

## Tecnologias

- HTML5 semântico
- CSS3 — variáveis CSS, Grid, Flexbox, animações
- JavaScript vanilla (sem frameworks)
- Fontes: [Fraunces](https://fonts.google.com/specimen/Fraunces) e [Quicksand](https://fonts.google.com/specimen/Quicksand) via Google Fonts
