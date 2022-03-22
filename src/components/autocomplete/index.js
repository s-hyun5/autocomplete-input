import "./autocomplete.css";

export default function Autocomplete({$app, initialState}){
    this.state = initialState

    this.$target = document.createElement('ul')
    this.$target.id = 'dropdown-wrap'

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if(this.state.data.length === 0 || this.state.searchWord === ""){
            this.$target.remove();
        } else {
            $app.appendChild(this.$target)

            this.$target.innerHTML =
                this.state.data.map(
                    (data, index) => `<li class="option">${data.text}</li>`
                ).join('')
        }
    }
}