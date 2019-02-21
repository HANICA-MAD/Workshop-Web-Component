const currentDoc = document.currentScript.ownerDocument;
class button extends HTMLElement {
  constructor() {
    // If you define a constructor, always call super() first as it is required by the CE spec.
    super();

    //Let's log every mouseclick event
    this.addEventListener("click", e => {
      console.log("Element was clicked!");
    });
  }

  // Called when element is inserted in DOM
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = currentDoc.querySelector("#button-workshop");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    const color = this.getAttribute("color");
    const label = this.getAttribute("label");
    const bgcolor = this.getAttribute("bgcolor");

    this.shadowRoot.querySelector(".btnworkshop").style.color = color;
    this.shadowRoot.querySelector(
      ".btnworkshop"
    ).style.backgroundColor = bgcolor;
    this.shadowRoot.querySelector(".btnworkshop").innerHTML = label;
  }
}

customElements.define("nice-button", button);
