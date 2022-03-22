import {request} from './api';
import '@fortawesome/fontawesome-free/js/all';
import Input from "./components/Input/index";

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
        },
    })

    this.setState = (nextState) => {
        this.state = nextState
    }

    const query = async (searchWord) => {
        const newData = await request(searchWord);

        this.setState({
            ...this.state,
            data: newData,
        })
    }
}