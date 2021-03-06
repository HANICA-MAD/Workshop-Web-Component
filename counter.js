const template = document.createElement("template");
template.innerHTML = `
  <style>
    button, p {
      display: inline-block;
    }
  </style>
  <button decrement>-</button>
    <p>0</p>
  <button increment>+</button>
`;

class iCounter extends HTMLElement {
  constructor() {
    super();

    // private var
    this._value = 0;

    // create shadow root
    this.root = this.attachShadow({ mode: "open" });

    // add template
    this.root.appendChild(template.content.cloneNode(true));

    // store important elements for later use
    this.displayValue = this.root.querySelector("p");
    this.incrementButton = this.root.querySelector("[increment");
    this.decrementButton = this.root.querySelector("[decrement]");
  }

  // Method called when the element gets added to the document
  connectedCallback() {
    // Add event listeners to the buttons
    this.incrementButton.addEventListener("click", e => this.value++);
    this.decrementButton.addEventListener("click", e => this.value--);

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", 1);
    }
  }

  // Attributes we care about getting values from.
  static get observedAttributes() {
    return ["value"];
  }

  set value(value) {
    this._value = value;
    this.displayValue.innerText = this._value;
  }

  get value() {
    return this._value;
  }

  // Lifecycle hook called when a observed attribute changes
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "value") {
      this.value = parseInt(newValue, 10);
    }
  }
}

customElements.define("i-counter", iCounter);
