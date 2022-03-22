import {request} from './api';
import '@fortawesome/fontawesome-free/js/all';
import Input from "./components/Input/index";
import Autocomplete from "./components/autocomplete/index";

export default function App($app) {
    this.state = {
        searchWord: '',
        data: [],
        isToggle: false,
        selectIdx: ''
    }

    const input = new Input({
        $app,
        onChange: (value) => {
            if(this.state.searchWord === value) return
            this.setState({
                ...this.state,
                searchWord: value,
            })
            if(value !== ""){
                query(value)
            }
            dropdown.setState({
                ...this.state,
                searchWord: value,
            })
        },
        focusIn: () => {
            this.setState({
                ...this.state,
                isToggle: true
            })
        },
        focusOut: () => {
            this.setState({
                ...this.state,
                isToggle: false
            })
        },
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

    const autocomplete = new Autocomplete({
        $app,
    })

    this.setState = (nextState) => {
        this.state = nextState
        autocomplete.setState({
            ...this.state,
            data: this.state.data,
            isToggle: this.state.isToggle,
            selectIdx: this.state.selectIdx
        })
    }

    const query = async (searchWord) => {
        const newData = await request(searchWord);

        this.setState({
            ...this.state,
            data: newData,
        })
    }
}