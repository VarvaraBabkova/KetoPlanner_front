import React from "react"
import DayCard from "../components/DayCard"

export default class DayList extends React.Component{

	render(){
		// console.log("In days List")
		// console.log(this.props)
		 return(
			<div className="days_list clearfix">
				<h3>Week Menu</h3>
				<input className="box_btn" type="image" src={require('../RecipesBox.png')} onClick={this.props.handleChangeView} />
				{
					this.props.days.map(day => <DayCard handleAdd = {this.props.handleAdd} 
														handleDelete={this.props.handleDelete} 
														key = {day.days} 
														day = {day}/>)
				}
			</div>
		)
	}

}