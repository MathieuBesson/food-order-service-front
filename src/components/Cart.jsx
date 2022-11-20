import { useEffect, useState } from "react";

export default function Cart({ cartState, toggleCart }) {
    return (
        <div className="cart">
            {cartState && (
                <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed h-screen top-0 right-0 bottom-0 left-0">
                    <div class="relative bg-white px-16 py-14 rounded-md text-center">
                        <h3 className="mb-4 text-2xl font-extrabold tracking-tight leading-none ">
                            Panier
                        </h3>
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
