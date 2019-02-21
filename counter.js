const template = document.createElement('template');
template.innerHTML = `
  <style>
    button, p {
      display: inline-block;
    }
  </style>
  <button aria-label="decrement">-</button>
    <p>0</p>
  <button aria-label="increment">+</button>
`;

 class iCounter extends HTMLElement {
    // Attributes we care about getting values from.
    static get observedAttributes() {
        return ['value'];
    }

    set value(value) {
        this._value = value;
        this.valueElement.innerText = this._value;
        this.dispatchEvent(new CustomEvent('valueChange', { detail: this._value }));
    }

    get value() {
        return this._value;
    }

    constructor() {
        super();

        // private var
        this._value = 0;

        // create shadow root
        this.root = this.attachShadow({ mode: 'open' });

        // add template
        this.root.appendChild(template.content.cloneNode(true));

        // store important elements for later use
        this.valueElement = this.root.querySelector('p');
        this.incrementButton = this.root.querySelectorAll('button')[1];
        this.decrementButton = this.root.querySelectorAll('button')[0];

        // add listeners
        this.incrementButton
            .addEventListener('click', (e) => this.value++);

        this.decrementButton
            .addEventListener('click', (e) => this.value--);
    }

    // Lifecycle hook called when a observed attribute changes
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'value') {
            this.value = parseInt(newValue, 10);
        }
    }
}

customElements.define('i-counter', iCounter);