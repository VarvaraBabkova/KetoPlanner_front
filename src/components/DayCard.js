import React from "react"
import MealItem from "./MealItem"
import DayMacrosItem from "./DayMacrosItem"

export default class DayCard extends React.Component{


	render(){
	//console.log("inside card " + this.props.day.days)
	//console.log(this.props.day.meals)
		return(
			<div className={"day_card " + this.props.day.days}>
				<h4>{this.props.day.days}</h4>

				{
					this.props.day.meals.map((meal, index) =>
					 <MealItem key={index} 
					 			handleAdd = {this.props.handleAdd} 
								handleDelete={this.props.handleDelete} 
								meal_time = {meal.name} 
								meal={meal.recipe} 
								meal_id = {index}
								day={this.props.day.days} 
					/>)
					
				}
				<div className="add_item_btn" onClick = {() => this.props.handleAdd(this.props.day.days)}>Add</div>

				 {//<DayMacrosItem meals = {this.props.day}/>
				}
			</div>
		)
	}

}

