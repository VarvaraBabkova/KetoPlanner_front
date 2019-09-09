import React from "react"

export default class Header extends React.Component{

	render(){
		//console.log(this.props)
		 return(
		 	<div>
	 	{
	 		// <div className="doily"></div>
	 	}
				<div className="header">
					

					<div className="header_brown">

						<h1 >Keto Meal Planner</h1>
						<div className="menu menu_btn1" onClick={() => this.props.changeView("Home")}>
							<br/>Home
						</div>
						<div className="menu menu_btn2" onClick={() => this.props.changeView("Recipes")}>
							<br/>Recipes
						</div>
						<div className="menu menu_btn3" onClick={() => this.props.changeView("Products")}>
							<br/>Products
						</div>
						<div className="menu menu_btn4" onClick={() => this.props.changeView("About")}>
							<br/>About
						</div>
					</div>

				</div>
			</div>

		)
	}

}