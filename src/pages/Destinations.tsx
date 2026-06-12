import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Destination {
    destinationId: number;
    destinationName: string;
    description: string;
}

function Destinations() {
    const navigate = useNavigate();

    const [destinations, setDestinations] = useState<
        Destination[]
    >([]);

    const [loading, setLoading] = useState(true);

    const fetchDestinations = async () => {
        try {
            const response = await api.get(
                "/destinations"
            );

            setDestinations(response.data);
        } catch (error) {
            console.error(
                "Failed to load destinations",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    if (loading) {
        return (
            <div className="page-container">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="page-title">
                Popular Destinations
            </h2>

            <div className="hero-section mb-5">
                <div>
                    <h1>Explore Amazing Destinations</h1>
                    <p>
                        Find places, check weather and
                        plan unforgettable trips.
                    </p>
                </div>
            </div>

            <div className="row g-4">
                {destinations.map((d) => (
                    <div
                        className="col-md-4"
                        key={d.destinationId}
                    >
                        <div className="travel-card p-4">

                            <h4>
                                {d.destinationName}
                            </h4>

                            <p>
                                {d.description}
                            </p>

                            <button
                                className="btn btn-travel"
                                onClick={() =>
                                    navigate(
                                        `/places/${d.destinationId}`
                                    )
                                }
                            >
                                View Places
                            </button>
                            <div className="mb-4">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate("/welcome")}
                                >
                                    ← Back
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Destinations;