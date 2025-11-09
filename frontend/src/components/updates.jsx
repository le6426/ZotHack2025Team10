import { useState } from "react";
import "./updates.css";
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'

dayjs.extend(timezone)

const localizer = dayjsLocalizer(dayjs)

function Updates() {
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
		    <div className="header">
                PETR
            </div>
            <div className="subheader">
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
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
		</body>
	);
}

export default Updates;
