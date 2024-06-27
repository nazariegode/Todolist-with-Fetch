import React from "react";
import fondo from "../../img/fondo.png";
import Todolist from "./libreta";

const Home = () => {
	return (
		<>
			<section
				style={{
					backgroundImage: `url(${fondo})`
				}}
			>
				<Todolist />
			</section>
		</>
	);
};

export default Home;
