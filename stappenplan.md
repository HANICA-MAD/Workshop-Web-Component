### stap 1
Maak een template aan die in de javascript wordt gebruikt, voeg eventueel de css toe

```
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
```

### Stap 2
Maak een javascript klasse aan die HtmlElement extend

class iCounter extends HTMLElement {
  constructor() {
      super()
  }
}

Deze klasse moet altijd de super aanroepen om bruikbaar te zijn

### Stap 3
Maak de shadow dom aan om vervolgens in deze shadow DOM een instantie aan te maken van je template

```
    this.root = this.attachShadow({ mode: "open" });

    this.root.appendChild(template.content.cloneNode(true));
```

### Stap 4
Haal vervolgens de elementen uit de shadow DOM en voeg er functionaliteit aan toe

```
  
    this.valueElement = this.root.querySelector("p");
    this.incrementButton = this.root.querySelector("[increment");
    this.decrementButton = this.root.querySelector("[decrement]");

    // Method called when the element gets added to the document
    connectedCallback() {
    // Add event listeners to the buttons
    this.incrementButton.addEventListener("click", e => this.value++);
    this.decrementButton.addEventListener("click", e => this.value--);

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", 1);
    }
  }
```

### Stap 5
Maak vervolgens een getter en een setter aan voor de value en voeg value toe aan de observed attributes, zodat deze vervolgens met een listener aangepast kan worden

```
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
```

### Stap 6
Exporteer deze klasse met een bepaalde naam:

```
customElements.define("i-counter", iCounter);
```
