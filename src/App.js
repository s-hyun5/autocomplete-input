import {request} from './api';
import '@fortawesome/fontawesome-free/js/all';
import Input from "./components/Input/index";
import Autocomplete from "./components/autocomplete/index";

export default function App($app) {
    this.state = {
        searchWord: '',
        data: []
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
    })

    const autocomplete = new Autocomplete({
        $app,
    })

    this.setState = (nextState) => {
        this.state = nextState
        autocomplete.setState({
            ...this.state,
            data: this.state.data,
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