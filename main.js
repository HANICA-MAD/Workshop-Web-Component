const currentDoc = document.currentScript.ownerDocument;
class button extends HTMLElement {
  constructor() {
    // If you define a constructor, always call super() first as it is required by the CE spec.
    super();
    this.changeColor = this.changeColor.bind(this);
  }

  // Called when element is inserted in DOM
  connectedCallback() {
    const template = currentDoc.querySelector("#button-workshop");
    const instance = template.content.cloneNode(true);
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(instance);

    const bgcolor = this.getAttribute("bgcolor");

    this.btn = this.shadowRoot.querySelector(".btnworkshop");
    this.input = this.shadowRoot.querySelector(".inputworkshop");
    this.btn.addEventListener("click", this.changeColor);

    // this.shadowRoot.querySelector(".btnworkshop").style.color = color;
    this.btn.style.backgroundColor = bgcolor;
    this.btn.style.color = this.color;
    this.shadowRoot.querySelector(".btnworkshop").innerHTML =
      "Click to change my color";
  }

  changeColor() {
    this.btn.style.backgroundColor = this.input.value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }
}

customElements.define("nice-button", button);
