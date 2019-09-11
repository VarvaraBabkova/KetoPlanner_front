import React from "react"

export default class MealItem extends React.Component{




	renderMeal(meal, meal_time, img_side){
		if (meal)
			return (<div className="meal_item" onClick={() => this.props.handleShow(meal)}>
		
						<div className="meal_text"><i>{meal.name}</i></div>
						
						<div className="meal_img">
							<img src={meal.img} height="30px" weight="30px"alt=""/>
						</div>
						<div className = "meal_item_macros">
							<p>Cals: {meal.calories} Carbs: {meal.carbohydrates}</p>
						</div>
					 	<button onClick={(e) => this.props.handleDelete(e, this.props.meal, this.props.meal_id, this.props.day)} className="delete_item_btn"> </button>
					
					</div>)
		else return null
	}

	render(){
		return(
			<div >
				{ this.renderMeal(this.props.meal, this.props.meal_time) }
			</div>

			
		)
	}

}