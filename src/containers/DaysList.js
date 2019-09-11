import React from "react"
import DayCard from "../components/DayCard"
import RecipeCard from "../components/RecipeCard"


export default class DayList extends React.Component{

		constructor(props){
			super(props)
			this.state = {
				girl_visibility: true,
				recipe_visibility: false,
				showing_recipe: {}
			}
		}

		componentDidMount() {
		  window.addEventListener('scroll', this.handleScroll);
		};

		componentWillUnmount() {
		  window.removeEventListener('scroll', this.handleScroll)
		}

		handleScroll=(event) => {
		  
		  const winScroll =
		    document.body.scrollTop || document.documentElement.scrollTop

		  const height =
		    document.documentElement.scrollHeight -
		    document.documentElement.clientHeight

		  const scrolled = winScroll / height

		//console.log('the scroll things',  scrolled)
			if (scrolled > 0.7) {
				this.setState({
				    girl_visibility: false,
				  })
			}
			if (scrolled === 0) {
				this.setState({
				    girl_visibility: true,
				  })
			}

		  
		};

		handleShow = (recipe) =>{
			this.setState({showing_recipe: recipe, recipe_visibility:true})
		}
		removeRecipeCard = () =>{
			this.setState({showing_recipe: {}, recipe_visibility:false})
		}

	render(){
		// console.log("In days List")
		let girl_class = (this.state.girl_visibility)? "day_list_girl": "day_list_girl invisible"
		// 		console.log(girl_class)
		// console.log(this.props.days)

		 return(
			<div className="days_list clearfix" >
				
				{
					this.props.days.map(day => <DayCard handleAdd = {this.props.handleAdd} 
														handleDelete={this.props.handleDelete} 
														key = {day.days} 
														day = {day}
														day_card_renew = {this.props.day_card_renew}
														handleShow = {this.handleShow}
														/>)
				}
				<div className={girl_class}></div>

				{
					 this.state.recipe_visibility ? 
						<RecipeCard  
							recipe = {this.state.showing_recipe}
							show_recipes_add = {false}
							handleChosen = {null}
							limit_for_today = {0}
							already_chosen={0} 
							am_i_showing_in_daylist = {true}
							handleClose = {this.removeRecipeCard}/>
						:console.log()
				}
				
			</div>
		)
	}

}

//				<input className="box_btn" type="image" src={require('../RecipesBox.png')} onClick={this.props.handleChangeView} />
