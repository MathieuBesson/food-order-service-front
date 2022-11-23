import { useEffect, useState } from "react";
import Header from "./../components/Header";
import DishList from "./../components/DishList";
import Cart from "./../components/Cart";
import { useNavigate } from "react-router-dom";

function Home({ auth }) {
    const [cartDishIds, setCartDishIds] = useState([]);
    const [cartState, setCartState] = useState(false);
    const [alert, setAlert] = useState({
        isDisplay: false,
        type: "",
        message: "",
    });

    const navigate = useNavigate();

    const toogleDishToCart = (id) => {
        if (auth === null) {
            navigate("/auth");
        }

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

    const toggleAlert = (type, message) => {
        setAlert({
            isDisplay: true,
            type,
            message,
        });

        setTimeout(() => {
            setAlert({
                isDisplay: false,
                type: "",
                message: "",
            });
        }, 5000);
    };

    const resetOrder = () => {
        setCartDishIds([]);
    };

    return (
        <div className="home mb-20">
            <Header toggleCart={toggleCart} auth={auth}></Header>
            {alert.isDisplay && (
                <div
                    className="container mx-auto mt-10 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                    role="alert"
                >
                    <span className="font-medium">{alert.type} : </span>
                    {alert.message}
                </div>
            )}
            <DishList
                auth={auth}
                toogleDishToCart={toogleDishToCart}
                cartDishIds={cartDishIds}
            ></DishList>
            <div className="flex justify-center">
                <button
                    className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                    onClick={toggleCart}
                >
                    Valider mon panier
                </button>
            </div>
            <Cart
                resetOrder={resetOrder}
                auth={auth}
                toggleCart={toggleCart}
                cartState={cartState}
                cartDishIds={cartDishIds}
                toggleAlert={toggleAlert}
            ></Cart>
        </div>
    );
}

export default Home;
