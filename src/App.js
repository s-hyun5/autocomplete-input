import {request} from './api';
import '@fortawesome/fontawesome-free/js/all';
import Input from "./components/Input/index";
import Autocomplete from "./components/Autocomplete/index";
import ClearButton from "./components/ClearButton/index";

const cache = {}

export default function App($app) {
    this.state = {
        searchWord: '',
        data: [],
        isToggle: false,
        selectIdx: ''
    }

    //Input Component
    const input = new Input({
        $app,
        onChange: (value) => {
            if(this.state.searchWord === value) return
            this.setState({
                ...this.state,
                searchWord: value,
                selectIdx: ''
            })
            //value 있을 때만 api 호출
            if(value !== ""){
                query(value)
            }
            //clearButton value 값 전달
            clearButton.setState(value)
            //autocomplete value 값 전달
            autocomplete.setState({
                ...this.state,
                searchWord: value,
            })
        },
        //포커스 있을 때 autocomplete 표시
        focusIn: () => {
            this.setState({
                ...this.state,
                isToggle: true
            })
        },
        //포커스 없을 때 autocomplete 닫기
        focusOut: () => {
            this.setState({
                ...this.state,
                isToggle: false
            })
        },
        //포커싱 아이템 방향키로 내리기
        arrowDown : () => {
            if(this.state.data.length === 0) return;
            if(this.state.selectIdx === ""){
                this.setState({
                    ...this.state,
                    selectIdx: 0
                })
            } else if(this.state.selectIdx === this.state.data.length - 1){
                this.setState({
                    ...this.state,
                    selectIdx: ''
                })
            } else {
                this.setState({
                    ...this.state,
                    selectIdx: this.state.selectIdx += 1
                })
            }
        },
        //포커싱 아이템 방향키로 올리기
        arrowUp : () => {
            if(this.state.data.length === 0) return;
            if(this.state.selectIdx === ""){
                this.setState({
                    ...this.state,
                    selectIdx: this.state.data.length - 1
                })
            } else if(this.state.selectIdx === 0){
                this.setState({
                    ...this.state,
                    selectIdx: ''
                })
            } else {
                this.setState({
                    ...this.state,
                    selectIdx: this.state.selectIdx -= 1
                })
            }
        }
    })

    //Autocomplete Component
    const autocomplete = new Autocomplete({
        $app,
    })

    //ClearButton Component
    const clearButton = new ClearButton({
        $app,
        //버튼 클릭 시 검색 초기화
        onClick: () => {
            this.setState({
                ...this.state,
                searchWord: '',
                data: [],
                selectIdx: ''
            })
        }
    })

    //setState
    this.setState = (nextState) => {
        this.state = nextState
        autocomplete.setState({
            ...this.state,
            data: this.state.data,
            isToggle: this.state.isToggle,
            selectIdx: this.state.selectIdx
        })
    }

    //API Request
    const query = async (searchWord) => {
        //캐싱한 데이터 유무에 따라 api 호출
        if(cache.hasOwnProperty(searchWord)){
            this.setState({
                ...this.state,
                data: cache[searchWord],
            })
        } else {
            const newData = await request(searchWord);
            this.setState({
                ...this.state,
                data: newData,
            })

            //새데이터 캐싱
            cache[searchWord] = newData;
        }
    }
}