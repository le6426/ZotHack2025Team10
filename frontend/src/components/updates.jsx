import { useState, useEffect} from "react";
import "./updates.css";
import Card from "./card.jsx";
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'

dayjs.extend(timezone)

const localizer = dayjsLocalizer(dayjs)

function Updates() {
    const [PetrList, setPetrList] = useState([]);
    const fetchPetrs = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/petrdrops/heuyoClTLaIfcDZM8P2N/weekSix")
        const PetrList = await response.json()
        setPetrList(PetrList)
    }

    useEffect(() => {
        fetchPetrs();
    }, []);

    console.log(PetrList);

    function filterDayandSortbyTime(day) {
        return PetrList.filter(petr => petr.day === day)
            .sort((a, b) => new Date(a.time) - new Date(b.time));
    }

    const createGoogleCalLink = (time, end, title, petrs) => {
        // const start = encodeURIComponent(time); // e.g. 20251108T180000
        // const end = encodeURIComponent(end);
        const details = encodeURIComponent(petrs.join(", "));
        const text = encodeURIComponent(title);
        // const location = encodeURIComponent(event.location);
        console.log(' time:', time);
      
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${time}/${end}&details=${details}`;
      };


	const [count, setCount] = useState(0);

    const myEventsList = [
        { title: 'Team Meeting', start: new Date(2025, 10, 8, 9, 0), end: new Date(2025, 10, 8, 10, 0) },
        { title: 'Project Deadline', start: new Date(2025, 10, 10, 0, 0), end: new Date(2025, 10, 10, 23, 59) },
        { title: 'Lunch with Sarah', start: new Date(2025, 10, 12, 12, 30), end: new Date(2025, 10, 12, 13, 30) },
        { title: 'Conference', start: new Date(2025, 10, 15, 9, 0), end: new Date(2025, 10, 17, 17, 0) },
        { title: 'Yoga Class', start: new Date(2025, 10, 18, 18, 0), end: new Date(2025, 10, 18, 19, 0) }
    ];

	return (
		<body id="updates-body">
		    <div className="header head" >
                PETR
            </div>
            <div className="subheader head">
                CAL
            </div>
            <div className="card">
				<button className="buttonstyle">MON</button>
                <button className="buttonstyle">TUE</button>
                <button className="buttonstyle">WED</button>
                <button className="buttonstyle">THU</button>
                <button className="buttonstyle">FRI</button>
			</div>
            <div className="grid">
                <div className="col">
                    {filterDayandSortbyTime("Monday").map((petr) => (
                        <div key={petr.id}>
                            <Card petrs={petr.petrs} time={petr.time} title={petr.petrDrop} url={petr.url} createGoogleCalLink={createGoogleCalLink}/>
                        </div>
                    ))}
                </div>
                <div className="col">
                    {filterDayandSortbyTime("Tuesday").map((petr) => (
                        <div key={petr.id}>
                            <Card petrs={petr.petrs} time={petr.time} title={petr.petrDrop} url={petr.url} createGoogleCalLink={createGoogleCalLink}/>
                        </div>
                    ))}
                </div>
                <div className="col">
                    {filterDayandSortbyTime("Wednesday").map((petr) => (
                        <div key={petr.id}>
                            <Card petrs={petr.petrs} time={petr.time} title={petr.petrDrop} url={petr.url} createGoogleCalLink={createGoogleCalLink}/>
                        </div>
                    ))}
                </div>
                <div className="col">
                    {filterDayandSortbyTime("Thursday").map((petr) => (
                        <div key={petr.id}>
                            <Card petrs={petr.petrs} time={petr.time} title={petr.petrDrop} url={petr.url} createGoogleCalLink={createGoogleCalLink}/>
                        </div>
                    ))}
                </div>
                <div className="col">
                    {filterDayandSortbyTime("Friday").map((petr) => (
                        <div key={petr.id}>
                            <Card petrs={petr.petrs} time={petr.time} title={petr.petrDrop} url={petr.url} createGoogleCalLink={createGoogleCalLink}/>
                        </div>
                    ))}
                </div>
            </div>
		</body>
	);
}

export default Updates;
