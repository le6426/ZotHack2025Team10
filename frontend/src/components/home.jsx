import { useState } from "react";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./home.css";

import RandomItem from "@/components/RandomItem";

/*
This is the starting point of our application. Here, we can begin coding 
and transforming this page into whatever best suits our needs. 
For example, we can start by creating a login page, home page, or an about section; 
there are many ways to get your application up and running. 
With App.jsx, we can also define global variables and routes to store information as well as page navigation.
*/
function Home() {
	const [count, setCount] = useState(0);

	return (
		<body id="home-body">
			<div className="body-container">
				<a href="#" target="_blank" rel="noreferrer">
					<img src="UC_Irvine_Anteaters_logo.svg" className="logo" alt="UCI logo" />
				</a>
			</div>
			<div class="flex-container">
				<h1>PETR<br></br>
					CAL
				</h1>
				<h2>
					<a href="#">Start</a>
				</h2>
				<h3 className="caption">Your campus plug for every drop.</h3>
				<h3>
					<a className="login" href="#">Log In</a>
				</h3>
			</div>
		</body>
	);
}

export default Home;