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
			this.setState({chosen: !this.state.chosen})
			this.props.handleChosen(this.props.recipe)
		}
		
		
	}

	render(){
		//console.log("in recipe card" )
		// console.log( this.props)
		let ch_str = this.state.chosen ? "chosen":""
		return(
			<div className={"recipe_card " + ch_str} onClick={this.handleClick}>
				<div className="recipe_card_img_bk">
					<h4>
						<img className="recipe_card_img" src={this.props.recipe.img}  alt=""/> 
						{this.props.recipe.name} 
					</h4><br/>

					<p>{this.props.recipe.ingredients}</p> <br/>
					<p>{this.props.recipe.instructions}</p>

				</div>
			</div>
		)
	}

}

