import React from 'react';
import './App.css';
import DaysList from "./containers/DaysList"
import Header from "./components/Header"

import RecipesList from "./containers/RecipesList"

const URL = "http://localhost:3000/"

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

    
    fetch(URL + "recipes")
    .then(res => res.json())
    .then(res => {
        console.log(res)
          this.setState({recipes: res})
        })

  fetch(URL + "mealplan")
    .then(res => res.json())
    .then(res => {
        console.log(res)
          this.setState({days: res})
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
    console.log("in delete " + meal_time + " " + day)
    let arr = this.state.days.map(d => {
                                            if (d.days === day) {
                                              //debugger
                                              d.meals = d.meals.filter(m => m.name !== meal_time)
                                              console.log(d)
                                            }
                                            return d
                                          })
    this.setState({days : arr})
    console.log (arr)

  }

  render(){
    //console.log(this.state.days)
    return (
      <div className="App "> 

        <Header />
        {

         
          ((!this.state.show_recipes)? 

              <DaysList handleAdd = {this.handleAdd} 
                        handleDelete={this.handleDelete}
                        days = {this.state.days} 
                        handleChangeView={this.changeView}/>

            :<RecipesList recipes ={this.state.recipes} 
                            handleChangeView={this.changeView}
                            show_recipes_add = {this.state.show_recipes_add}/> 
              
          )
        }
        

      </div>
    );
  }
  
}


