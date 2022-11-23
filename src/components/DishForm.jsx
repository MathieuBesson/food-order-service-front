import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/stringUtils";

function DishForm({ dish, removeDish, toggleAlert, add = false, auth }) {
    const [name, setName] = useState(dish.name);
    const [type, setType] = useState(dish.type);
    const [image, setImage] = useState(dish.image);
    const [foods, setFoods] = useState([]);
    const [foodIdsUsed, setFoodIdsUsed] = useState({});

    useEffect(() => {
        setFoodsFromApi();
        initializeFoodIdsUsed();
    }, []);

    const initializeFoodIdsUsed = () => {
        let foodIdsUsedData = {};
        dish.foods.forEach((food) => {
            foodIdsUsedData[food._id] = food.quantity;
        });

        setFoodIdsUsed(foodIdsUsedData);
    };

    const setFoodsFromApi = async () => {
        let foodsData = await fetch(`${import.meta.env.VITE_API_URL}/foods`);
        foodsData = await foodsData.json();
        setFoods(foodsData);
    };

    const isFoodUsed = (foodId) => {
        return foodIdsUsed.hasOwnProperty(foodId);
    };

    const handleChangeFoodList = (food) => {
        let foodIds = {};
        if (foodIdsUsed.hasOwnProperty(food._id)) {
            foodIds = {
                ...foodIdsUsed,
            };
            delete foodIds[food._id];
        } else {
            foodIds = {
                ...foodIdsUsed,
                [food._id]: 1,
            };
        }
        setFoodIdsUsed(foodIds);
    };

    const handleChangeQuantityFoodList = (foodId, quantity) => {
        if (!foodIdsUsed.hasOwnProperty(foodId)) {
            return;
        }

        const foodIds = {
            ...foodIdsUsed,
            [foodId]: parseInt(quantity),
        };
        setFoodIdsUsed(foodIds);
    };

    const submit = async (e) => {
        e.preventDefault();
        const foodsToSent = [];
        for (const foodIdUsedKey in foodIdsUsed) {
            foodsToSent.push({
                _id: foodIdUsedKey,
                quantity: foodIdsUsed[foodIdUsedKey],
            });
        }

        let method = null;
        let body = {
            name: name,
            foods: foodsToSent,
            type: type,
            image: image,
        };

        if (add) {
            method = "POST";
        } else {
            method = "PUT";
            body._id = dish._id;
        }

        await fetch(`${import.meta.env.VITE_API_URL}/dishs/`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method,
            body: JSON.stringify(body),
        }).then(() => {
            toggleAlert("Succes", "Plat sauvegardé !");
        });
    };

    const deleteDish = async (e) => {
        e.preventDefault();
        removeDish(dish);

        await fetch(`${import.meta.env.VITE_API_URL}/dishs/${dish._id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "DELETE",
        }).then(() => {
            toggleAlert("Succes", "Plat supprimé !");
        });
    };

    return (
        <form className="flex items-center mb-5">
            <div className="mr-10 flex-1">
                <div className="form-group">
                    <label
                        htmlFor="nom"
                        className="form-label inline-block mb-2 text-gray-700 font-bold"
                    >
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="nom"
                        placeholder="Entrer un nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="type"
                        className="form-label inline-block mb-2 text-gray-700 font-bold"
                    >
                        Type
                    </label>
                    <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="type"
                        placeholder="Type d'aliment"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="image"
                        className="form-label inline-block mb-2 text-gray-700 font-bold"
                    >
                        Lien image
                    </label>
                    <input
                        type="url"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="image"
                        placeholder="Image de l'aliment"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group mr-10 flex-1">
                <div className="flex flex-wrap">
                    {foods.map((food, key) => (
                        <div
                            key={key}
                            className="flex items-center mb-4 w-auto mr-5"
                        >
                            <div className="mr-5">
                                <input
                                    id={food.name}
                                    type="checkbox"
                                    checked={isFoodUsed(food._id)}
                                    onChange={() => handleChangeFoodList(food)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={food.name}
                                    className="ml-2 text-sm font-medium"
                                >
                                    {capitalizeFirstLetter(food.name)}
                                </label>
                            </div>
                            <div>
                                <input
                                    value={foodIdsUsed[food._id] ?? 0}
                                    onChange={(e) =>
                                        handleChangeQuantityFoodList(
                                            food._id,
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    className="form-control block w-20 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row">
                {add === false ? (
                    <>
                        <button
                            onClick={submit}
                            className="h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mr-5"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={deleteDish}
                            className="h-fit bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                            Supprimer
                        </button>
                    </>
                ) : (
                    <button
                        onClick={submit}
                        className="h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mr-5"
                    >
                        Ajouter
                    </button>
                )}
            </div>
        </form>
    );
}

export default DishForm;
