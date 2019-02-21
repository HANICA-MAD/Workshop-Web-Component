const currentDoc = document.currentScript.ownerDocument;

export default class MyCounter extends HTMLElement {
  constructor() {
    super();

    // Bind the methods to this
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    // Get the template and append it the the shadow DOM
    const template = currentDoc.querySelector("#increment-template");
    const instance = template.content.cloneNode(true);
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(instance);

    // Declare variables from the shadow DOM
    this.incrementBtn = this.shadowRoot.querySelector("[increment]");
    this.decrementBtn = this.shadowRoot.querySelector("[decrement]");
    this.displayVal = this.shadowRoot.querySelector("span");
  }

  // Method called when the element gets added to the document
  connectedCallback() {
    // Add event listeners to the buttons
    this.incrementBtn.addEventListener("click", this.increment);
    this.decrementBtn.addEventListener("click", this.decrement);

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", 1);
    }
  }

  increment() {
    // Set the value and check if it hasn't reached the maximum value (if set)
    const step = +this.step || 1;
    const newValue = +this.value + step;

    if (this.max) {
      this.value = newValue > +this.max ? +this.max : +newValue;
    } else {
      this.value = +newValue;
    }
  }

  decrement() {
    // Same as increment
    const step = +this.step || 1;
    const newValue = +this.value - step;

    if (this.min) {
      this.value = newValue <= +this.min ? +this.min : +newValue;
    } else {
      this.value = +newValue;
    }
  }

  // Export value as an observed attribute so it can be used
  static get observedAttributes() {
    return ["value"];
  }

  // Use the observed attribute value to change the value of the span(aka displayvalue)
  attributeChangedCallback(name, oldValue, newValue) {
    this.displayVal.innerText = this.value;

    console.log(`${name} changed its value from ${oldValue} to ${newValue}`);
  }

  // List of getters and setters
  get value() {
    return this.getAttribute("value");
  }

  get step() {
    return this.getAttribute("step");
  }

  get min() {
    return this.getAttribute("min");
  }

  get max() {
    return this.getAttribute("max");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  set step(newValue) {
    this.setAttribute("step", newValue);
  }

  set min(newValue) {
    this.setAttribute("min", newValue);
  }

  set max(newValue) {
    this.setAttribute("max", newValue);
  }

  // Method called when the element gets removed
  disconnectedCallback() {
    this.incrementBtn.removeEventListener("click", this.increment);
    this.decrementBtn.removeEventListener("click", this.decrement);
  }
}

// Export the class as "my-counter" so it may be used in other files as a component
window.customElements.define("my-counter", MyCounter);
