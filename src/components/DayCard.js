import React from "react"
import MealItem from "./MealItem"
import DayMacrosItem from "./DayMacrosItem"

export default class DayCard extends React.Component{


	render(){
		//console.log(this.props.day)
		return(
			<div className="day_card">
				<h4>{this.props.day.name}</h4>

				<MealItem handleAdd = {this.props.handleAdd} 
							handleDelete={this.props.handleDelete} 
							meal_time = "Breakfast" meal={this.props.day.breakfast} 
							day={this.props.day.name} img_side={true}/>
				<MealItem handleAdd = {this.props.handleAdd} 
							handleDelete={this.props.handleDelete} 
							meal_time = "Lunch" meal={this.props.day.lunch} 
							day={this.props.day.name} img_side={false}/>
				<MealItem handleAdd = {this.props.handleAdd} 
							handleDelete={this.props.handleDelete} 
							meal_time = "Dinner" meal={this.props.day.dinner} 
							day={this.props.day.name} img_side={true}/>
				<MealItem handleAdd = {this.props.handleAdd} 
							handleDelete={this.props.handleDelete} 
							meal_time = "Snack" meal={this.props.day.snack} 
							day={this.props.day.name} img_side={false}/>
				<MealItem handleAdd = {this.props.handleAdd} 
							handleDelete={this.props.handleDelete} 
							meal_time = "Dessert" meal={this.props.day.dessert} 
							day={this.props.day.name} img_side={true}/>

				<DayMacrosItem meals = {this.props.day}/>
			</div>
		)
	}

}

