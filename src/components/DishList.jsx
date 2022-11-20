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

    const getFoodsFromApi = async (foods) => {
        return await foods.map(async (food) => {
            return await fetch(`http://localhost:3000/foods/${food._id}`).then(
                (response) => response.json()
            );
        });
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
                                <div className="mb-4 rounded overflow-hidden shadow-lg">
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
                                                {food.name}
                                            </span>
                                        ))}
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
