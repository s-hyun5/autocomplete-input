import "./input.css";

export default function Input({$app, onChange, focusIn, focusOut, arrowDown, arrowUp}){
    this.onChange = onChange
    this.focusIn = focusIn
    this.focusOut = focusOut
    this.arrowDown = arrowDown
    this.arrowUp = arrowUp

    this.$target = document.createElement('form')
    this.$target.id = 'searchForm'
    this.$target.setAttribute('autocomplete', "off")
    $app.appendChild(this.$target)

    this.$inputWrap = document.createElement('div')
    this.$inputWrap.className = 'input-wrap'
    this.$target.appendChild(this.$inputWrap)

    this.$input = document.createElement('input')
    this.$input.id = 'autoInput'
    this.$inputWrap.appendChild(this.$input)

    this.$icon = document.createElement('icon')
    this.$icon.className = 'search-icon fa-solid fa-magnifying-glass'
    this.$inputWrap.appendChild(this.$icon)


    this.$target.addEventListener('input', e => {
        this.onChange(e.target.value)
    })

    this.$target.addEventListener('focusin', e => {
        this.focusIn()
    });

    this.$target.addEventListener('focusout', e => {
        this.focusOut()
    });

    this.$target.addEventListener('keydown', e => {
        if(e.isComposing) return;
        switch (e.key){
            case "ArrowDown":
                this.arrowDown();
                break;
            case "ArrowUp":
                this.arrowUp();
                break;
        }
    });
}