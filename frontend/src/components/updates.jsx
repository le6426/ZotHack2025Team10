import { useState } from "react";
import "./updates.css";


function Updates() {
	const [count, setCount] = useState(0);

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
		</body>
	);
}

export default Updates;
