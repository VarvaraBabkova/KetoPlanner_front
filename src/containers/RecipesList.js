import React from "react"
import RecipeCard from "../components/RecipeCard"

export default class RecipesList extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			recipes: [],
			filter_menu: false,
		}
	}
	handleChosen = (recipe) => {
		// console.log(recipe)
		// console.log("is chosen")
		
				this.props.handleChosen(recipe)

			

	}
	handleFilter = (type) =>{
		//console.log(type)
		if(type === "all"){
			this.setState({recipes: this.props.recipes})
		}else {
			this.setState({recipes: this.props.recipes.filter(r => r.category === type)})
		}
	}

	componentDidMount(){
		this.setState({recipes: this.props.recipes})
	}
	handleFilterHover = () => {
		//console.log("in hover")
		this.setState({filter_menu:true})
	}
	handleFilterUnhover = () => {
		//console.log("in unhover")
		this.setState({filter_menu:false})

	}

	iconClassName(type){
		return  `filter_icon ${(this.state.filter_menu)? "" : "invisible "} ${type}` 
	}

	render(){
	
		const filter_icon = `filter_icon ${(this.state.filter_menu)? "" : "invisible "} all`  

		return(
			<div className="recipes_list clearfix">
				{(this.props.show_recipes_add)?
					<input className="box_btn" type="image" src={require('../RecipesBox.png')} onClick={this.props.handleAdd} />
					:null}



				<div className="filter_menu" onMouseLeave = {this.handleFilterUnhover}>

					<div className="filter_icon filter" onMouseEnter={this.handleFilterHover}></div>

					<div className={this.iconClassName("all")} onClick={() => this.handleFilter("all")}></div>
					<div className={this.iconClassName("meat")} onClick={() => this.handleFilter("meat")}></div>
					<div className={this.iconClassName("chicken")} onClick={() => this.handleFilter("chicken")}></div>
					<div className={this.iconClassName("fish")} onClick={() => this.handleFilter("fish")}></div>
					<div className={this.iconClassName("dessert")} onClick={() => this.handleFilter("dessert")}></div>
				</div>
				{					 
					this.state.recipes.map(recipe => <RecipeCard key = {recipe.name} 
																recipe = {recipe}
																show_recipes_add = {this.props.show_recipes_add}
																handleChosen = {this.handleChosen}
																limit_for_today = {this.props.limit_for_today}
																already_chosen={this.props.recipes.filter(r => r.chosen === true).length}
																am_i_showing_in_daylist = {false}
																/>)
				}
				
			</div>
		)
	}

}