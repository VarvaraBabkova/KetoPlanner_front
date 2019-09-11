import React from "react"

export default class Products extends React.Component{

	calculate_full_list(){
		let list = []
		let all_week_meals = this.props.days.map(d => d.meals).flat()
		list = all_week_meals.map(m => m.recipe.ingredients)
		
		return list
	}
	calculate_list(){
		let full = this.calculate_full_list()
		let arr = [... new Set(full)]
		let arr_with_counts = []
		for (var i = 0; i < arr.length; i++) {
			let num = full.filter(a => a ===arr[i]).length
			arr_with_counts.push({count: num, value: arr[i]})
		}
		return arr_with_counts;
	}
	render(){
		
		return(
			<div className="products clearfix">
				<div className = "product_girl"></div>
				<div className = "product_list_bk">
					<div className = "product_list">
						<h4>Shopping List</h4> <br/>
						<ul >
							{this.calculate_list().map(item => <li> {item.value} <b>X {item.count}</b></li>)}
						</ul>
					</div>
				</div>
				
			</div>
		)
	}

}