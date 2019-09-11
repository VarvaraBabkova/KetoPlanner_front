import React from "react"

export default class RecipeCard extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			chosen: false
		}
	}

	handleClick = () => {


		if (this.props.show_recipes_add){
			console.log(this.props.limit_for_today)
			console.log(this.props.already_chosen)

			if (this.props.limit_for_today <= this.props.already_chosen) 
				{
					return null
				}else{

					this.setState({chosen: !this.state.chosen})
					this.props.handleChosen(this.props.recipe)
				}
		}
		
		
	}

	render(){
		//console.log("in recipe card" )
		// console.log( this.props)
		let ch_str = this.state.chosen ? "chosen":""
		return(
			<div className={"recipe_card " + ch_str} onClick={this.handleClick}>
				<div className="recipe_card_img_bk">
				<img className="recipe_card_img" src={this.props.recipe.img}  alt=""/> 
				<img className="paper_clip" src= "paper_clip.png" alt= ""/>
					<h4>
						
						{this.props.recipe.name} 
					</h4><br/>
					<div className = "recipe_card_macros">
						<p>Calories: {this.props.recipe.calories}</p> 
						<p>Carbohydrates: {this.props.recipe.carbohydrates}</p>
					</div>
					<div className = "recipe_card_text">
						<p>{this.props.recipe.ingredients}</p> <br/>
						<p>{this.props.recipe.instructions}</p>
					</div>
				</div>
			</div>
		)
	}

}

