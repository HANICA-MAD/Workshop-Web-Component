class buttoon extends HTMLElement {
    constructor() {
        // If you define a constructor, always call super() first as it is required by the CE spec.
        super();

        //Let's log every mouseclick event
        this.addEventListener('click', e => {
            console.log("Element was clicked!");
        });
    }

    // Called when element is inserted in DOM
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});

        // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
        // Current document needs to be defined to get DOM access to imported HTML
        const btn = document.createElement("BUTTON");
        var t = document.createTextNode("CLICK ME");
        btn.appendChild(t);
        shadowRoot.appendChild(btn);

        btn.style.color = "blue";
        btn.style.width = "250px";
        btn.style.height = "250px";
    }
}

customElements.define('nice-button', buttoon);
