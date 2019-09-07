import React from "react"
import RecipeCard from "../components/RecipeCard"

export default class RecipesList extends React.Component{

	render(){
		console.log(this.props)
		return(
			<div className="recipes_list clearfix">
			<h3>Recipes</h3>
				<input className="box_btn" type="image" src={require('../RecipesBox.png')} onClick={this.props.handleChangeView} />
				{
					this.props.recipes.map(recipe => <RecipeCard key = {recipe.name} 
																recipe = {recipe}
																show_recipes_add = {this.props.show_recipes_add}/>)
				}
			</div>
		)
	}

}