import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Destinations from "./pages/Destinations";
import Places from "./pages/Places";
import Weather from "./pages/Weather";
import MyTrips from "./pages/MyTrips";
import TripDays from "./pages/TripDays";
import Activities from "./pages/Activities";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Authentication */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main Menu */}
                <Route path="/welcome" element={<Welcome />} />

                {/* Destinations */}
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/places/:destinationId" element={<Places />} />
                <Route path="/weather/:placeName" element={<Weather />} />

                {/* Trips */}
                <Route path="/trips" element={<MyTrips />} />
                <Route path="/tripdays/:tripId" element={<TripDays />} />
                <Route path="/activities/:dayId" element={<Activities />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;