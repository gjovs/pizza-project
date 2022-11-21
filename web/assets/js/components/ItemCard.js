class ItemCard extends HTMLElement {
  constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.imageURL = 'https://images7.alphacoders.com/596/thumb-1920-596343.jpg';
      this.title = '';
      this.ingredients = '';
      this.price = '';
  }

  connectedCallback() {
    this.shadow.appendChild(this.component());
    this.shadow.appendChild(this.styles());
  }

  component(){
    const card = document.createElement('div');
    card.classList.add('item-card');

    const img = document.createElement('img');
    img.classList.add('item-card__img');
    img.setAttribute('src', this.imageURL);

    const title = document.createElement('h3');
    title.classList.add('item-card__title');
    title.textContent = this.title;

    const ingredients = document.createElement('span');
    ingredients.classList.add('item-card__ingredients');
    ingredients.textContent = this.ingredients;

    const price = document.createElement('span');
    price.classList.add('item-card__price');
    price.textContent = this.price;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(ingredients)
    card.appendChild(price)

    return card;
  }

  styles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .item-card {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        padding: 10px 20px;
        max-width: 300px;
        min-height: 300px;
        background-color: #3A3A3C;
        border-radius: 12px;
      }

      .item-card__img {
        height: 130px;
        width : 230px;
        border-radius: 12px;
      }
    `;

    return styles;
  }
}

customElements.define('item-card', ItemCard);