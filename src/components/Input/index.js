import "./input.css";

export default function Input({$app, onChange, focusIn, focusOut, arrowDown, arrowUp}){
    this.onChange = onChange
    this.focusIn = focusIn
    this.focusOut = focusOut
    this.arrowDown = arrowDown
    this.arrowUp = arrowUp

    //form 태그 생성
    this.$target = document.createElement('form')
    this.$target.id = 'searchForm'
    this.$target.setAttribute('autocomplete', "off")
    $app.appendChild(this.$target)

    //input과 버튼 감쌀 div 태그 생성
    this.$inputWrap = document.createElement('div')
    this.$inputWrap.className = 'input-wrap'
    this.$target.appendChild(this.$inputWrap)

    //input 태그 생성
    this.$input = document.createElement('input')
    this.$input.id = 'autoInput'
    this.$inputWrap.appendChild(this.$input)

    //검색 모양 아이콘 생성
    this.$icon = document.createElement('icon')
    this.$icon.className = 'search-icon fa-solid fa-magnifying-glass'
    this.$inputWrap.appendChild(this.$icon)

    let timeout;

    //input value 값 전달하는 이번트 추가
    this.$target.addEventListener("input", (e) => {
        if(timeout){
            clearTimeout(timeout)
        }
        timeout = setTimeout(() =>
            this.onChange(e.target.value)
        , 500);
    });


    //input focusin 이벤트 추가
    this.$target.addEventListener('focusin', e => {
        this.focusIn()
    });

    //input focusout 이벤트 추가
    this.$target.addEventListener('focusout', e => {
        this.focusOut()
    });

    //input 방향키 keydown 이벤트 추가
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