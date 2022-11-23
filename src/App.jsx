import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useState } from "react";

function App() {
    const [auth, setAuth] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home auth={auth} />} />
                    <Route
                        path="auth"
                        element={<Auth setAuth={setAuth} auth={auth} />}
                    />
                    <Route path="admin" element={<Admin auth={auth} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
