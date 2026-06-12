import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Activity {
    activityId: number;
    activityName: string;
    activityTime: string;
}

function Activities() {
    const { dayId } = useParams();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityName, setActivityName] = useState("");
    const [activityTime, setActivityTime] = useState("");

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await api.get(
                `/activities/day/${dayId}`
            );

            setActivities(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addActivity = async () => {
        try {
            await api.post("/activities", {
                dayId,
                activityName,
                activityTime,
            });

            setActivityName("");
            setActivityTime("");

            fetchActivities();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteActivity = async (
        activityId: number
    ) => {
        try {
            await api.delete(
                `/activities/${activityId}`
            );

            fetchActivities();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-container">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Activities</h2>

                <button
                    className="btn btn-travel"
                    data-bs-toggle="modal"
                    data-bs-target="#addActivityModal"
                >
                    + Add Activity
                </button>

            </div>

            {activities.length === 0 ? (
                <div className="alert alert-info">
                    No activities added yet.
                </div>
            ) : (
                activities.map((activity) => (
                    <div
                        className="trip-card"
                        key={activity.activityId}
                    >
                        <h5>
                            {activity.activityName}
                        </h5>

                        <p>
                            {activity.activityTime}
                        </p>

                        <button className="btn btn-warning me-2">
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                deleteActivity(
                                    activity.activityId
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}

            {/* Add Activity Modal */}

            <div
                className="modal fade"
                id="addActivityModal"
                tabIndex={-1}
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Add Activity</h5>
                        </div>

                        <div className="modal-body">

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Activity Name"
                                value={activityName}
                                onChange={(e) =>
                                    setActivityName(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="time"
                                className="form-control"
                                value={activityTime}
                                onChange={(e) =>
                                    setActivityTime(
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
                                onClick={addActivity}
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

export default Activities;