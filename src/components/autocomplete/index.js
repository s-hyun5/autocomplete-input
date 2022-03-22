import "./autocomplete.css";

export default function Autocomplete({$app, initialState}){
    this.state = initialState

    this.$target = document.createElement('ul')
    this.$target.id = 'autocomplete-wrap'

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if(this.state.data.length === 0 || this.state.searchWord === ""){
            this.$target.remove();
        } else {
            $app.appendChild(this.$target)
            this.$target.style.display = this.state.isToggle ? 'initial' : 'none'

            this.$target.innerHTML =
                this.state.data.map(
                    (data, index) => `<li>${data.text}</li>`
                ).join('')

            this.$target.childNodes.forEach((c, c_idx) => {
                if(c_idx === this.state.selectIdx){
                    c.setAttribute("class", "option selected")
                } else {
                    c.setAttribute("class", "option" )
                }
            })
        }
    }
}