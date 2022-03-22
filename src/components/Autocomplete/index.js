import "./autocomplete.css";

export default function Autocomplete({$app, initialState}){
    this.state = initialState

    //autocomplete dropdown 생성
    this.$target = document.createElement('ul')
    this.$target.id = 'autocomplete-wrap'

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        //검색 결과, 검색어 없을 경우 autocomplete 제거
        if(this.state.data.length === 0 || this.state.searchWord === ""){
            this.$target.remove();
        } else {
            //데이터가 있을 때만 autocomplete 추가
            $app.appendChild(this.$target)
            //input focus에 따라 화면 표시
            this.$target.style.display = this.state.isToggle ? 'initial' : 'none'

            //autocomplete에 검색 결과 추가
            this.$target.innerHTML =
                this.state.data.map(
                    (data, index) => `<li>${data.text}</li>`
                ).join('')

            //방향키에 따라 선택된 아이템 포커싱 
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