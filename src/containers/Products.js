import React from "react"

export default class Products extends React.Component{

	calculate_list(){
		let list = []
		let all_week_meals = this.props.days.map(d => d.meals).flat()
		list = all_week_meals.map(m => m.recipe.ingredients)
		
		return list
	}
	render(){
		//console.log(this.props)
		return(
			<div className="products clearfix">
				<div className = "product_girl"></div>
				<div className = "product_list_bk">
					<div className = "product_list">
						<h4>Shopping List</h4> <br/>
						<ul >
							{this.calculate_list().map(item => <li> {item}</li>)}
						</ul>
					</div>
				</div>
				
			</div>
		)
	}

}