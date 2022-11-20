import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DishList from "./components/DishList";
import Cart from "./components/Cart";

function App() {
    const [cartDishIds, setCartDishIds] = useState([]);
    const [cartState, setCartState] = useState(false);

    const toogleDishToCart = (id) => {
        if (cartDishIds.includes(id)) {
            setCartDishIds(
                cartDishIds.filter(function (item) {
                    return item !== id;
                })
            );
        } else {
            setCartDishIds([...cartDishIds, id]);
        }
    };

    const toggleCart = () => setCartState(!cartState);

    return (
        <div className="App">
            <Header toggleCart={toggleCart}></Header>
            <DishList
                toogleDishToCart={toogleDishToCart}
                cartDishIds={cartDishIds}
            ></DishList>
            <Cart toggleCart={toggleCart} cartState={cartState}></Cart>
        </div>
    );
}

export default App;
