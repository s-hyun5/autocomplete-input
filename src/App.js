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

    const input = new Input({
        $app,
        onChange: (value) => {
            if(this.state.searchWord === value) return
            this.setState({
                ...this.state,
                searchWord: value,
                selectIdx: ''
            })
            if(value !== ""){
                query(value)
            }
            clearButton.setState(value)
            autocomplete.setState({
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

    const clearButton = new ClearButton({
        $app,
        onClick: () => {
            this.setState({
                ...this.state,
                searchWord: '',
                data: [],
                selectIdx: ''
            })
        }
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

            cache[searchWord] = newData;
        }
    }
}