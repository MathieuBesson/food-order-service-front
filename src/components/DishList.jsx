import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "./../utils/stringUtils";

function App() {
    const [dishs, setDishs] = useState([]);

    useEffect(() => {
        setDishsFromApi();
    }, []);

    const setDishsFromApi = async () => {
        let dishs = await fetch("http://localhost:3000/dishs/type");
        dishs = await dishs.json();

        let foodsId = [];
        dishs.forEach((dishType) => {
            dishType.items.forEach((dish) => {
                dish.foods.forEach((food) => {
                    foodsId.push(food._id);
                });
            });
        });
        foodsId = [...new Set(foodsId)];

        let foodRequested = {};
        for (const foodId of foodsId) {
            const response = await fetch(
                `http://localhost:3000/foods/${foodId}`
            );
            foodRequested[foodId] = await response.json();
        }

        for (const dishTypeKey in dishs) {
            for (const dishKey in dishs[dishTypeKey].items) {
                const foods = dishs[dishTypeKey].items[dishKey].foods;
                for (let foodKey in dishs[dishTypeKey].items[dishKey].foods) {
                    foods[foodKey] = foodRequested[foods[foodKey]._id];
                }
            }
        }

        setDishs(dishs);
    };

    return (
        <div className="container mx-auto mt-10">
            {dishs.map((dishType, key) => (
                <div key={key}>
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl">
                        {capitalizeFirstLetter(dishType.type)}
                    </h2>
                    <div className="grid grid-cols-4 gap-4 mb-10">
                        {dishType.items.map((dish, dishKey) => (
                            <div key={dishKey}>
                                <div className="mb-4 rounded overflow-hidden shadow-lg relative">
                                    <img
                                        className="w-full h-40"
                                        src={dish.image}
                                        alt="Sunset in the mountains"
                                    ></img>
                                    <h3 className="font-bold text-xl px-6 py-2">
                                        {capitalizeFirstLetter(dish.name)}
                                    </h3>
                                    <div className="px-6 py-2">
                                        {dish.foods.map((food, foodKey) => (
                                            <span
                                                key={foodKey}
                                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                            >
                                                {capitalizeFirstLetter(
                                                    food.name
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mx-3 my-5">
                                        {dish.disponibility > 0 ? (
                                            <>
                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                    Commander
                                                </button>
                                                <svg
                                                    className="h-8 w-8 text-green-500"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    {" "}
                                                    <path
                                                        stroke="none"
                                                        d="M0 0h24v24H0z"
                                                    />{" "}
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="9"
                                                    />{" "}
                                                    <path d="M9 12l2 2l4 -4" />
                                                </svg>
                                            </>
                                        ) : (
                                            <>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                                                    Indisponible
                                                </button>
                                                <svg
                                                    className="h-8 w-8 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
