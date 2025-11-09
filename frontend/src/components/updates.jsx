import { useState, useEffect } from "react";
import "./updates.css";
import Card from "./card.jsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { Link } from "react-router-dom";

dayjs.extend(timezone);
const localizer = dayjsLocalizer(dayjs);

function Updates() {
    const [PetrList, setPetrList] = useState([]);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(1); // default to weekSix
    const weekKeys = ["week4", "weekFive", "weekSix"];
    const weekNames = {
        0: "Oct 20 - Oct 24",
        1: "Oct 27 - Oct 31",
        2: "Nov 3 - Nov 7",
    }

    const currentWeekKey = weekKeys[currentWeekIndex];
    const currentWeekName = weekNames[currentWeekIndex];

    const fetchPetrs = async (weekKey) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/petrdrops/heuyoClTLaIfcDZM8P2N/${weekKey}`);
            const data = await response.json();
            setPetrList(data);
        } catch (err) {
            console.error("Failed to fetch PETR drops:", err);
        }
    };

    useEffect(() => {
        fetchPetrs(currentWeekKey);
    }, [currentWeekKey]);

    function filterDayandSortbyTime(day) {
        return PetrList.filter(petr => petr.day === day)
            .sort((a, b) => new Date(a.time) - new Date(b.time));
    }

    const createGoogleCalLink = (time, end, title, petrs) => {
        const details = encodeURIComponent(petrs ? petrs.join(", ") : '');
        const text = encodeURIComponent(title);
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${time}/${end}&details=${details}`;
    };

    // Handlers for next/previous week navigation
    const handlePrevWeek = () => {
        setCurrentWeekIndex(prev => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextWeek = () => {
        setCurrentWeekIndex(prev => (prev < weekKeys.length - 1 ? prev + 1 : prev));
    };

    return (
        <div id="updates-body">
            <div className="header head">PETR</div>
            <div className="subheader head">CAL</div>

            {/* Week Navigation */}
            <div className="week-navigation">
                <button onClick={handlePrevWeek} disabled={currentWeekIndex === 0}>
                    ⬅ Previous
                </button>
                <span className="week-label">{currentWeekName.toUpperCase()}</span>
                <button onClick={handleNextWeek} disabled={currentWeekIndex === weekKeys.length - 1}>
                    Next ➡
                </button>
            </div>
            <Link className="home-link" to="/">
                <a>Home</a>
            </Link>
            <div className="card">
                <button className="buttonstyle">MON</button>
                <button className="buttonstyle">TUE</button>
                <button className="buttonstyle">WED</button>
                <button className="buttonstyle">THU</button>
                <button className="buttonstyle">FRI</button>
            </div>

            <div className="grid">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <div className="col" key={day}>
                        {filterDayandSortbyTime(day).map((petr) => (
                            <Card
                                key={petr.id}
                                petrs={petr.petrs}
                                time={petr.time}
                                title={petr.petrDrop}
                                url={petr.url}
                                createGoogleCalLink={createGoogleCalLink}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Updates;
