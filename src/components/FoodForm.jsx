import { useState } from "react";

function FoodForm({ food, removeFood, toggleAlert, add = false, auth }) {
    const [name, setName] = useState(food.name);
    const [type, setType] = useState(food.type);
    const [quantity, setQuantity] = useState(food.quantity);

    const submit = async (e) => {
        e.preventDefault();
        let method = null;
        let body = {
            name,
            type,
            quantity: parseInt(quantity),
        };

        if (add) {
            method = "POST";
        } else {
            method = "PUT";
            body._id = food._id;
        }

        await fetch(`${import.meta.env.VITE_API_URL}/foods`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method,
            body: JSON.stringify(body),
        }).then(() => {
            toggleAlert("Succes", "Aliment sauvegardé !");
        });
    };

    const deleteFood = async (e) => {
        e.preventDefault();
        removeFood(food);

        await fetch(`${import.meta.env.VITE_API_URL}/foods/${food._id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            method: "DELETE",
        }).then(() => {
            toggleAlert("Succes", "Aliment supprimé !");
        });
    };

    return (
        <form className="flex justify-between items-center mb-5">
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
                    htmlFor="quantity"
                    className="form-label inline-block mb-2 text-gray-700 font-bold"
                >
                    Quantité
                </label>
                <input
                    type="number"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="quantity"
                    placeholder="Quantité d'aliment"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
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
                            onClick={deleteFood}
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

export default FoodForm;
