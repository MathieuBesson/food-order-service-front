import { useEffect, useState } from "react";
import Header from "./../components/Header";
import FoodForm from "./FoodForm";

function FoodListForm({ auth }) {
    const [foods, setFoods] = useState([]);
    const [alert, setAlert] = useState({
        isDisplay: false,
        type: "",
        message: "",
    });

    useEffect(() => {
        setFoodsFromApi();
    }, []);

    const setFoodsFromApi = async () => {
        let foodsData = await fetch(`${import.meta.env.VITE_API_URL}/foods`);
        foodsData = await foodsData.json();
        setFoods(foodsData);
    };

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

    const removeFood = (food) => {
        setFoods(foods.filter((item) => item._id !== food._id));
    };

    return (
        <div className="container mx-auto block p-6 rounded-lg shadow-lg bg-white mt-10">
            {alert.isDisplay && (
                <div
                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                    role="alert"
                >
                    <span className="font-medium">{alert.type} : </span>
                    {alert.message}
                </div>
            )}
            <FoodForm
                food={{
                    name: "",
                    type: "",
                    quantity: 0,
                }}
                add={true}
                auth={auth}
                toggleAlert={toggleAlert}
            ></FoodForm>
            {foods.map((food, key) => (
                <FoodForm
                    auth={auth}
                    key={key}
                    food={food}
                    removeFood={removeFood}
                    toggleAlert={toggleAlert}
                ></FoodForm>
            ))}
        </div>
    );
}

export default FoodListForm;
