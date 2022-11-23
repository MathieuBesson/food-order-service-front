import { useEffect, useState } from "react";
import DishForm from "./DishForm";

function DishListForm({ auth }) {
    const [dishs, setDishs] = useState([]);
    const [alert, setAlert] = useState({
        isDisplay: false,
        type: "",
        message: "",
    });

    useEffect(() => {
        setDishsFromApi();
    }, []);

    const setDishsFromApi = async () => {
        let dishsData = await fetch(`${import.meta.env.VITE_API_URL}/dishs`);
        dishsData = await dishsData.json();
        setDishs(dishsData);
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

    const removeDish = (dish) => {
        setDishs(dishs.filter((item) => item !== dish));
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
            <DishForm
                auth={auth}
                dish={{
                    name: "",
                    type: "",
                    image: "",
                    foods: [],
                }}
                removeDish={removeDish}
                toggleAlert={toggleAlert}
                add={true}
            ></DishForm>
            {dishs.map((dish, key) => (
                <DishForm
                    auth={auth}
                    key={key}
                    dish={dish}
                    removeDish={removeDish}
                    toggleAlert={toggleAlert}
                ></DishForm>
            ))}
        </div>
    );
}

export default DishListForm;
