import "./input.css";

export default function Input({$app, onChange}){
    this.onChange = onChange

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
}