import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Auth({ setAuth, auth }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (auth !== null) {
            navigate("/");
        }
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        let user = await fetch(`${import.meta.env.VITE_API_URL}/auth/token`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ login, password }),
        });

        setAuth(await user.json());

        navigate("/");
    };

    return (
        <div className="auth ">
            <Header />

            <form className="container mx-auto mt-20">
                <div className="flex items-end mb-5">
                    <div className="form-group mr-5">
                        <label
                            htmlFor="login"
                            className="form-label inline-block mb-2 text-gray-700 font-bold"
                        >
                            Identifiant
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="login"
                            placeholder="Entrer votre identifiant"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="form-group mr-5">
                        <label
                            htmlFor="type"
                            className="form-label inline-block mb-2 text-gray-700 font-bold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="type"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={(e) => submit(e)}
                        className="h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mr-5"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Auth;
