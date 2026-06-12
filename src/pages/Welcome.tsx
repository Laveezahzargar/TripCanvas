import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="page-container">

            <div className="hero-section">
                <div>
                    <h1>Plan Your Next Adventure</h1>
                    <p>
                        Explore destinations, weather and trips.
                    </p>
                </div>
            </div>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="travel-card p-4 text-center">
                        <h3>Destinations</h3>

                        <button
                            className="btn btn-travel"
                            onClick={() =>
                                navigate("/destinations")
                            }
                        >
                            Explore
                        </button>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="travel-card p-4 text-center">
                        <h3>My Trips</h3>

                        <button
                            className="btn btn-travel"
                            onClick={() => navigate("/trips")}
                        >
                            Open
                        </button>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="travel-card p-4 text-center">
                        <h3>Logout</h3>

                        <button
                            className="btn btn-danger"
                            onClick={() => navigate("/")}
                        >
                            Logout
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Welcome;