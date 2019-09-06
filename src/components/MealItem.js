import React from "react"

export default class MealItem extends React.Component{

	renderMeal(meal, meal_time, img_side){
		if (meal)
			return <div className="meal_item">
					<p>
						{ //image-name or name-image
							img_side? 
								<i>{meal_time}: {meal.name} <img src={meal.img} height="30px" weight="30px"alt=""/></i>
								:<i><img src={meal.img} height="30px" weight="30px" alt=""/> {meal_time} : {meal.name}</i>
						}

						<button onClick={() => this.props.handleAdd(meal_time, this.props.day)} className="add_item_btn">+</button>

						<button onClick={() => this.props.handleDelete(meal_time, this.props.day)} className="delete_item_btn">X</button>
					 </p>
					</div>
		else return null
	}

	render(){
		return(
			<div >
				{ this.renderMeal(this.props.meal, this.props.meal_time, this.props.img_side) }
			</div>

			
		)
	}

}