import React from "react"

export default class MealItem extends React.Component{




	renderMeal(meal, meal_time, img_side){
		if (meal)
			return <div className="meal_item">
					<p>
						{ 
							
								<i>
									<div className="meal_text"><b>{/*meal_time*/}</b> {meal.name}</div>
									<div className="meal_img">
										<img src={meal.img} height="30px" weight="30px"alt=""/>
									</div>
								</i>
							
						}
						
{
	// <button onClick={() => this.props.handleAdd(meal_time, this.props.day)} 
	//					 		className="look_item_btn"> </button>
}
						
						 <button onClick={() => this.props.handleDelete(this.props.meal, this.props.meal_id, this.props.day)} 
						 		className="delete_item_btn"> </button>
						 
						
					 </p>
					</div>
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