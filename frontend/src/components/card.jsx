import { useState, useEffect} from "react";
import "./card.css";
import { InstagramEmbed } from "react-social-media-embed";
import { Link } from "react-router-dom";


function Card({ petrs, time, title, url, createGoogleCalLink }) {

    const date = new Date(time);
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    console.log(formatter.format(date)); // e.g., "14:30:45"  
    console.log(petrs);

    function toUTCString(dateObj) {
        const year = dateObj.getUTCFullYear();
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const hours = String(dateObj.getUTCHours()).padStart(2, '0');
        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
        // console.log("UTC String:", `${year}${month}${day}T${hours}${minutes}${seconds}Z`);
        return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    }

    const startUTC = toUTCString(date);

    const endDate = new Date(date.getTime() + 60 * 30 * 1000);
    const endUTC = toUTCString(endDate);

      
    // buttonAddToCalendar() {
    //     // Logic to add event to calendar
    //     <Link to={createGoogleCalLink(event)} target="_blank" rel="noopener noreferrer">
    //         Add to Google Calendar
    //     </Link>
    // }


	return (
		<div className="card1">
            <h3 className="title">{title}</h3>
            {petrs && <p>{petrs.join(", ")}</p>}
            <p>{formatter.format(date)}</p>
            {url && <InstagramEmbed url={url} width={300} captioned/>}
            <Link to={createGoogleCalLink(startUTC, endUTC, title, petrs)} target="_blank" rel="noopener noreferrer" className="calendar-link">
                Add to Google Calendar
            </Link>
		</div>
	);
}

export default Card;
