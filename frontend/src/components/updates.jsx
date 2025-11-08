import { useState } from "react";
import "./updates.css";


function Updates() {
	const [count, setCount] = useState(0);

	return (
		<>
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
		</>
	);
}

export default Updates;
