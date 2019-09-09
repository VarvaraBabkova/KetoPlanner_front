import React from "react"
import RecipeCard from "../components/RecipeCard"

export default class RecipesList extends React.Component{
	handleChosen = (recipe) => {
		// console.log(recipe)
		// console.log("is chosen")
		this.props.handleChosen(recipe)
	}

	render(){
		//console.log(this.props)
		return(
			<div className="recipes_list clearfix">
				{(this.props.show_recipes_add)?
					<input className="box_btn" type="image" src={require('../RecipesBox.png')} onClick={this.props.handleAdd} />
					:null}
				{				
					 

					this.props.recipes.map(recipe => <RecipeCard key = {recipe.name} 
																recipe = {recipe}
																show_recipes_add = {this.props.show_recipes_add}
																handleChosen = {this.handleChosen}/>)
				}
				
			</div>
		)
	}

}