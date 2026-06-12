import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await api.post(
                "/users/register",
                {
                    username,
                    email,
                    password,
                }
            );

            alert("Registration successful");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="text-center mb-4">
                    Create Account
                </h2>

                <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

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

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-travel w-100"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <p className="text-center mt-3">
                    <Link to="/">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;