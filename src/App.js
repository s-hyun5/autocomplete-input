import {request} from './api';
import '@fortawesome/fontawesome-free/js/all';
import Input from "./components/Input/index";
import Autocomplete from "./components/autocomplete/index";

export default function App($app) {
    this.state = {
        searchWord: '',
        data: [],
        isToggle: false,
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