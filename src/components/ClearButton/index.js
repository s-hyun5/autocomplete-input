import './clearButton.css';

export default function ClearButton({$app, initialState, onClick}){
    this.state = initialState
    this.onClick = onClick

    this.$target = document.querySelector('.input-wrap')
    this.$button = document.createElement('button')
    this.$button.id = 'btn-clear'
    this.$button.setAttribute('style', 'display: none')
    this.$target.appendChild(this.$button)
    this.$icon = document.createElement('icon')
    this.$icon.className = 'fa-solid fa-circle-xmark'
    this.$button.appendChild(this.$icon)

    this.$button.addEventListener('click', e => {
        e.preventDefault();
        this.onClick();
        const input = document.getElementById('autoInput');
        input.value = null;
        this.$button.setAttribute('style', 'display: none')
    })

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$button.style.display = this.state ? 'initial' : 'none'
    }
}