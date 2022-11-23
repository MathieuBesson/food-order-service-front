import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DishListForm from "../components/DishListForm";
import FoodListForm from "../components/FoodListForm";
import Header from "./../components/Header";

function Admin({ auth }) {
    const [activeTab, setActiveTab] = useState("foods");
    const navigate = useNavigate();

    useEffect(() => {
        if (auth === null || !auth.roles.includes(0)) {
            navigate("/auth");
        }
    }, []);

    return (
        <div className="admin">
            <Header admin={true} />
            <div className="container mx-auto mt-10">
                <ul className=" flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <button
                            className={`inline-block py-3 px-4 text-xl ${
                                activeTab === "foods"
                                    ? "text-white bg-blue-600 rounded-lg active"
                                    : "text-grey"
                            }`}
                            onClick={() => setActiveTab("foods")}
                        >
                            Aliments
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("dishs")}
                            className={`inline-block py-3 px-4 text-xl ${
                                activeTab === "dishs"
                                    ? "text-white bg-blue-600 rounded-lg active"
                                    : "text-grey"
                            }`}
                        >
                            Plats
                        </button>
                    </li>
                </ul>
            </div>
            {activeTab === "foods" && <FoodListForm auth={auth}></FoodListForm>}
            {activeTab === "dishs" && <DishListForm auth={auth}></DishListForm>}
        </div>
    );
}

export default Admin;
