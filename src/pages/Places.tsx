import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../services/api";

interface Place {
    placeName: string;
    description?: string;
}

function Places() {
    const navigate = useNavigate();

    const { destinationId } = useParams();

    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const response = await api.get(
                `/destinations/${destinationId}/places`
            );

            setPlaces(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load places");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="page-container text-center">
                <div className="spinner-border"></div>
            </div>
        );
    }

    return (
        <div className="page-container">

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() =>
                    navigate("/destinations")
                }
            >
                ← Back
            </button>

            <h2 className="page-title">
                Places
            </h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row g-4">

                {places.map((place, index) => (
                    <div
                        className="col-md-4"
                        key={index}
                    >
                        <div className="travel-card p-4">

                            <h4>
                                {place.placeName}
                            </h4>

                            {place.description && (
                                <p>
                                    {place.description}
                                </p>
                            )}

                            <button
                                className="btn btn-travel"
                                onClick={() =>
                                    navigate(
                                        `/weather/${place.placeName}`
                                    )
                                }
                            >
                                View Weather
                            </button>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Places;