import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface TripDay {
    dayId: number;
    dayNumber: number;
    date: string;
}

function TripDays() {
    const navigate = useNavigate();
    const { tripId } = useParams();

    const [days, setDays] = useState<TripDay[]>([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        fetchDays();
    }, []);

    const fetchDays = async () => {
        try {
            const response = await api.get(
                `/tripdays/trip/${tripId}`
            );

            setDays(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addDay = async () => {
        try {
            await api.post("/tripdays", {
                tripId,
                date,
            });

            setDate("");
            fetchDays();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteDay = async (dayId: number) => {
        try {
            await api.delete(`/tripdays/${dayId}`);

            fetchDays();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-container">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Trip Days</h2>

                <button
                    className="btn btn-travel"
                    data-bs-toggle="modal"
                    data-bs-target="#addDayModal"
                >
                    + Add Day
                </button>

            </div>

            {days.length === 0 ? (
                <div className="alert alert-info">
                    No days added yet.
                </div>
            ) : (
                days.map((day) => (
                    <div
                        className="trip-card"
                        key={day.dayId}
                    >
                        <h4>
                            Day {day.dayNumber}
                        </h4>

                        <p>{day.date}</p>

                        <button
                            className="btn btn-travel me-2"
                            onClick={() =>
                                navigate(
                                    `/activities/${day.dayId}`
                                )
                            }
                        >
                            Activities
                        </button>

                        <button className="btn btn-warning me-2">
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                deleteDay(day.dayId)
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}

            {/* Add Day Modal */}

            <div
                className="modal fade"
                id="addDayModal"
                tabIndex={-1}
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Add Day</h5>
                        </div>

                        <div className="modal-body">

                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) =>
                                    setDate(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>

                            <button
                                className="btn btn-travel"
                                onClick={addDay}
                            >
                                Save
                            </button>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default TripDays;