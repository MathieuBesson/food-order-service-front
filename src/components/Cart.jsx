import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/stringUtils";

export default function Cart({
    cartState,
    toggleCart,
    cartDishIds,
    auth,
    resetOrder,
    toggleAlert,
}) {
    const [dishs, setDishs] = useState([]);
    const [dishsQuantites, setDishsQuantites] = useState({});

    useEffect(() => {
        setDishsFromApi();
    }, [cartDishIds]);

    const setDishsFromApi = async () => {
        let dishsData = [];
        let dishsQuantitesData = {};

        for (const cartDishId of cartDishIds) {
            const dishData = await fetch(
                `${import.meta.env.VITE_API_URL}/dishs/${cartDishId}`
            );
            const dish = await dishData.json();
            dishsData.push(dish);
            dishsQuantitesData[dish._id] = 1;
        }

        setDishs(dishsData);
        setDishsQuantites(dishsQuantitesData);
    };

    const increaseQuantity = (id, key) => {
        if (dishs[key].disponibility <= dishsQuantites[id]) {
            return;
        }

        setDishsQuantites({
            ...dishsQuantites,
            [id]: dishsQuantites[id] + 1,
        });
    };

    const decreaseQuantity = (id) => {
        if (dishsQuantites[id] === 0) {
            return;
        }

        setDishsQuantites({
            ...dishsQuantites,
            [id]: dishsQuantites[id] - 1,
        });
    };

    const order = async () => {
        const dishsToPost = { dishs: [], userId: auth._id };
        dishs.forEach((dish) => {
            dishsToPost.dishs.push({
                _id: dish._id,
                quantity: dishsQuantites[dish._id],
            });
        });

        await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "POST",
            body: JSON.stringify(dishsToPost),
        });

        toggleAlert("Success", "Votre commande à bien été prise en compte !");
        resetOrder();
        toggleCart();

        // window.location.reload(false);
    };

    return (
        <div className="cart">
            {cartState && (
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed h-screen top-0 right-0 bottom-0 left-0">
                    <div className="relative bg-white px-16 py-14 rounded-md text-center">
                        <h3 className="mb-4 text-2xl font-extrabold tracking-tight leading-none ">
                            Panier
                        </h3>
                        {dishs.map((dishData, key) => (
                            <div
                                key={key}
                                className="flex flex-col h-20 items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 mt-5"
                            >
                                <img
                                    className="object-cover w-40 h-20 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                    src={dishData.image}
                                />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-lg font-bold tracking-tight">
                                        {capitalizeFirstLetter(dishData.name)}
                                    </h5>
                                    <div className="flex flex-row items-center mx-auto">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(dishData._id)
                                            }
                                        >
                                            <svg
                                                className="h-4 w-4 text-slate-500"
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
                                                <line
                                                    x1="5"
                                                    y1="12"
                                                    x2="19"
                                                    y2="12"
                                                />
                                            </svg>
                                        </button>
                                        <p className="mx-2">
                                            {dishsQuantites[dishData._id]}
                                        </p>
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    dishData._id,
                                                    key
                                                )
                                            }
                                        >
                                            <svg
                                                className="h-4 w-4 text-slate-500"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                />
                                                <line
                                                    x1="12"
                                                    y1="5"
                                                    x2="12"
                                                    y2="19"
                                                />
                                                <line
                                                    x1="5"
                                                    y1="12"
                                                    x2="19"
                                                    y2="12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {dishs.length === 0 ? (
                            "Pas de plats dans le panier"
                        ) : (
                            <button
                                onClick={() => order()}
                                className="bg-yellow-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-10"
                            >
                                Confirmer votre commande
                            </button>
                        )}
                        <button onClick={toggleCart}>
                            <svg
                                className="h-8 w-8 top-3 right-3 text-red-500 absolute"
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
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
