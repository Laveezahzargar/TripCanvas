function Weather() {
    return (
        <div className="page-container">

            <h2 className="page-title">
                Current Weather
            </h2>

            <div className="row g-4">

                <div className="col-md-3">
                    <div className="weather-card">
                        <h1>14°C</h1>
                        <p>Temperature</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="weather-card">
                        <h1>Cloudy</h1>
                        <p>Condition</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="weather-card">
                        <h1>78%</h1>
                        <p>Humidity</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="weather-card">
                        <h1>12km/h</h1>
                        <p>Wind</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Weather;