import { Link } from "react-router-dom";
function Header({ toggleCart = null, auth, admin = false }) {
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/8845/8845257.png"
                            className="mr-3 h-6 sm:h-9"
                            alt="Food Order Service"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Food Order Service
                        </span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {admin === false && auth === null && (
                            <Link
                                to="/auth"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                Connexion
                            </Link>
                        )}
                        {admin === false && auth !== null && (
                            <button
                                className="ml-5 flex flex-col items-center"
                                onClick={toggleCart}
                            >
                                <svg
                                    className="h-8 w-8 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="text-white">
                                    Valider mon panier
                                </span>
                            </button>
                        )}
                        <Link to="/admin" className="ml-5">
                            <svg
                                className="h-8 w-8 text-white"
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
                                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                <rect
                                    x="5"
                                    y="11"
                                    width="14"
                                    height="10"
                                    rx="2"
                                />{" "}
                                <circle cx="12" cy="16" r="1" />{" "}
                                <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                            </svg>
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                >
                                    Plats
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
