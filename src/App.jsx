import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DishList from "./components/DishList";

function App() {
    const [dishs, setDishs] = useState([]);

    useEffect(() => {
        setDishsFromApi();
    }, []);

    const setDishsFromApi = async () => {
        const dishsApi = await fetch("http://localhost:3000/dishs/type").then(
            (response) => response.json()
        );

        setDishs(dishsApi);
    };
    return (
        <div className="App">
            <Header></Header>
            <DishList></DishList>
        </div>
    );
}

export default App;
