import '@fortawesome/fontawesome-free/js/all';
import Input from "./components/Input/index";

export default function App($app) {
    this.state = {
    }

    const input = new Input({
        $app
    })

    this.setState = (nextState) => {
        this.state = nextState
    }
}