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

    const content = document.createElement('div');
    content.classList.add('item-card__text-content');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('item-card__info');

    const title = document.createElement('h3');
    title.classList.add('item-card__title');
    title.textContent = this.title;

    const ingredients = document.createElement('span');
    ingredients.classList.add('item-card__ingredients');
    ingredients.textContent = this.ingredients;

    const price = document.createElement('div');
    price.classList.add('item-card__price');

    const cents = document.createElement('span');

    price.textContent = `R$${this.price}`;

    content.appendChild(title);
    content.appendChild(ingredients);

    infoDiv.appendChild(img);
    infoDiv.appendChild(content);

    card.appendChild(infoDiv);
    card.appendChild(price);

    return card;
  }

  static get observedAttributes() {
    return ['title', 'ingredients', 'price'];
  }

  attributeChangedCallback(nameAtr, oldValue, newValue) {
    // this.nameAtr = newValue;

    if (nameAtr === 'title') {
      this.title = newValue;
    } else if (nameAtr === 'ingredients') {
      this.ingredients = newValue;
    } else if (nameAtr === 'price'){
      this.price = newValue;
    }
  }

  styles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .item-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        max-width: 250px;
        min-height: 300px;
        color: white;
        background-color: #3A3A3C;
        text-align: left;
        border-radius: 12px;
      }

      .item-card__img {
        height: 130px;
        width : 100%;
        background-size: cover;
        object-fit: cover;
        background-position: center;
        border-radius: 12px;
      }

      .item-card__info {
        width: 100%;
      }

      .item-card__text-content {
        display: flex;
        justify-self: top;
        width: 100%;
        flex-direction: column;
        justify-content: center;
      }

      .item-card__title {
        margin-bottom: 2px;
        margin-top: 8px;
        text-transform: capitalize;
        gap: 0px
        font-size: 1.5rem;
        align-self: flex-start;
      } 

      .item-card__ingredients {
        color: #AEAEB0;
        align-self: flex-start;
        font-size: 1rem;
      }

      .item-card__price {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F9C739;
        border-radius: 50px;

        font-size: 2rem;
        font-weight: 600;
        color: #000000;
      }
    `;

    return styles;
  }
}

customElements.define('item-card', ItemCard);