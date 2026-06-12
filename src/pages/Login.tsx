import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post(
                "/users/login",
                {
                    email,
                    password,
                }
            );

            console.log(response.data);

            // If backend returns JWT token
            if (response.data.token) {
                localStorage.setItem(
                    "token",
                    response.data.token
                );
            }

            navigate("/welcome");
        } catch (error) {
            console.error(error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="text-center mb-4">
                    Travel Planner
                </h2>

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="btn btn-travel w-100"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="text-center mt-3">
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;