import React from "react"

export default class DayMacrosItem extends React.Component{

	macros(meal, macro){
					//console.log(meal)

		if (meal.hasOwnProperty(macro)){
			//console.log("MACRO"+ meal[macro])
			return meal[macro]
		}
		return 0; 
	}
	// carbs(meal){
	// 	if (meal.hasOwnProperty("carbs")){
	// 		return meal.carbs
	// 	}
	// 	return 0; 
	// }

	calculate(){
		

		let calories_sum = this.props.meals.reduce((sum, meal) => sum + this.macros(meal.recipe,  "calories"), 0) 

		//console.log("SUM" + calories_sum)

		let carbs_sum  = this.props.meals.reduce((sum, meal) => sum + this.macros(meal.recipe,  "carbohydrates"), 0) ;
		//this.macros(breakfast, "carbohydrates") + this.macros(lunch, "carbohydrates") + 
		//			this.macros(dinner, "carbohydrates") + this.macros(snack, "carbohydrates") 
					//+ this.macros(dessert, "carbohydrates")
		let proteins_sum  = this.props.meals.reduce((sum, meal) => sum + this.macros(meal.recipe,  "protein"), 0) 
		//this.macros(breakfast, "protein") + this.macros(lunch, "protein") + 
		//			this.macros(dinner, "protein") + this.macros(snack, "protein") 
		//			+ this.macros(dessert, "protein")
		let fat_sum = this.props.meals.reduce((sum, meal) => sum + this.macros(meal.recipe,  "fat"), 0) 
		//this.macros(breakfast, "fat") + this.macros(lunch, "fat") + 
		//			this.macros(dinner, "fat") + this.macros(snack, "fat") 
		//			+ this.macros(dessert, "fat")
		return {calories_sum , carbs_sum, proteins_sum, fat_sum}
	}


	render(){
		// console.log("in macros card" )
		// console.log( this.props.meals)
		 return(
			<div className="macros_div">
				<div className="">
					<p> Total Calories : {this.calculate().calories_sum}  Total Carbs : {this.calculate().carbs_sum} </p>
					<p> Total Proteins : {this.calculate().proteins_sum}  Total Fat : {this.calculate().fat_sum} </p>
				</div>
			</div>
		)
	}

}