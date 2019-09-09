import React from "react"

export default class DayMacrosItem extends React.Component{

	macros(meal, macro){
		if (meal.hasOwnProperty(macro)){
			return meal[macro]
		}
		return 0; 
	}
	carbs(meal){
		if (meal.hasOwnProperty("carbs")){
			return meal.carbs
		}
		return 0; 
	}

	calculate(){
		let breakfast = this.props.meals.breakfast
		let lunch = this.props.meals.lunch
		let dinner = this.props.meals.dinner
		let snack = this.props.meals.snack
		let dessert = this.props.meals.dessert

		let calories_sum = this.macros(breakfast, "calories") + this.macros(lunch, "calories") + 
					this.macros(dinner, "calories") + this.macros(snack, "calories") + this.macros(dessert, "calories")

		//console.log(calories_sum)

		let carbs_sum = this.macros(breakfast, "carbohydrates") + this.macros(lunch, "carbohydrates") + 
					this.macros(dinner, "carbohydrates") + this.macros(snack, "carbohydrates") 
					+ this.macros(dessert, "carbohydrates")
		let proteins_sum = this.macros(breakfast, "protein") + this.macros(lunch, "protein") + 
					this.macros(dinner, "protein") + this.macros(snack, "protein") 
					+ this.macros(dessert, "protein")
		let fat_sum = this.macros(breakfast, "fat") + this.macros(lunch, "fat") + 
					this.macros(dinner, "fat") + this.macros(snack, "fat") 
					+ this.macros(dessert, "fat")
		return {calories_sum, carbs_sum, proteins_sum, fat_sum}
	}


	render(){
		console.log("in macros card" )
		console.log( this.props.meals)
		return(
			<div className="macros_div">
				<div className="">
					<p> Total Calories : {this.calculate().calories_sum} </p>
					<p> Total Carbs : {this.calculate().carbs_sum} </p>
					<p> Total Proteins : {this.calculate().proteins_sum} </p>
					<p> Total Fat : {this.calculate().fat_sum} </p>
				</div>
			</div>
		)
	}

}