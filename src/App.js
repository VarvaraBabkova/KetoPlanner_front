import React from 'react';
import './App.css';
import DaysList from "./containers/DaysList"

import plan from "./sample_plan.json"
import recipes_db from "./sample_recipes.json"

import RecipesList from "./containers/RecipesList"


export default  class App extends React.Component {

  constructor(){
    super()
    this.state = {
        days: [],
        recipes: [],
        show_recipes: false,
        show_recipes_add: false,
      }
  }

  componentDidMount(){
   
    this.setState({
        days: plan.days, 
        recipes: recipes_db.recipes
      })
  }

  changeView = () => {
    this.setState({show_recipes: !this.state.show_recipes})
  }

  handleAdd = (meal_time, day) =>{
    meal_time = meal_time.toLowerCase()
    console.log("in add " + meal_time + " " + day)  
    if (!this.state.show_recipes_add){
        this.setState({show_recipes: true, show_recipes_add: true})
    }else{
        this.setState({show_recipes: false, show_recipes_add: false})
    }
  }

  handleDelete = (meal_time, day) => {
    meal_time = meal_time.toLowerCase()
    console.log("in delete " + meal_time + " " + day)
    let arr = this.state.days.map(d => {
                                            if (d.name === day) {
                                              d[meal_time] = {}
                                            }
                                            return d
                                          })
    this.setState({days : arr})
    console.log (arr)

  }

  render(){
    console.log(recipes_db.recipes)
    return (
      <div className="App ">
        {
          ((!this.state.show_recipes)? 

              <DaysList handleAdd = {this.handleAdd} 
                        handleDelete={this.handleDelete}
                        days = {this.state.days} 
                        handleChangeView={this.changeView}/>

            :<RecipesList recipes ={this.state.recipes} 
                            handleChangeView={this.changeView}/> 
              
          )
        }
        

      </div>
    );
  }
  
}


