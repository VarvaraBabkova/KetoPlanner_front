import React from 'react';
import './App.css';
import DaysList from "./containers/DaysList"
import About from "./containers/About"
import Products from "./containers/Products"

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
        menu: "Home",
        edit_day:"",
        day_card_renew:0,
      }
  }

  componentDidMount(){    
    fetch(URL + "recipes")
    .then(res => res.json())
    .then(res => {
        console.log(res)
          res.map (r => r.chosen = false)
          this.setState({recipes: res})
        })

    fetch(URL + "mealplan")
      .then(res => res.json())
      .then(res => {
          console.log(res)
            this.setState({days: res})
          })

   
  }


  changeView = (menu) => {
    this.setState({menu: menu}, console.log(this.state.menu))
  }

  fetch_post(mealplan_id, recipe_id){
    fetch(URL + "meals", {
            method: 'POST', 
            body: JSON.stringify({
              mealplan_id: mealplan_id,
              recipe_id: recipe_id 

            }), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));
  }

  handleAdd = ( day) =>{
    

    if (!this.state.show_recipes_add){
        this.setState({menu: "Recipes", show_recipes_add: true})
        this.setState({edit_day: day})
    }else{
        let chosen_recipes = this.state.recipes.filter(r => r.chosen === true)
      
        let arr = this.state.days
        let adding_day = arr.filter(d => d.days === this.state.edit_day)

        
        for (var i = 0; i < chosen_recipes.length; i++) {
          adding_day[0].meals.push({"name":"Meal", "recipe":chosen_recipes[i]})
            console.log(adding_day[0].id)
            console.log(chosen_recipes[i].id)

            this.fetch_post(adding_day[0].id, chosen_recipes[i].id)

        }
        let unchosen_recipes = this.state.recipes.map(res => {res.chosen = false; return res})   
        this.setState({menu: "Home", show_recipes_add: false, days:arr, recipes: unchosen_recipes})

        

        }
  }

  fetch_delete(meal_id) {
    console.log(meal_id)
    fetch(URL + `meals/${meal_id}`, {
            method: 'DELETE', 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));
  }

  handleDelete = (recipe, id, day) => {
   
    let arr = this.state.days.map(d => {
                                          if (d.days === day) {
                                             let meal_id =  d.meals.find((m, index)=> id === index)
                                              d.meals = d.meals.filter((m, index)=> id !== index)
                                             
                                              this.fetch_delete(meal_id.id)
                                              

                                            }
                                            return d
                                          })
    this.setState({days : arr, day_card_renew: this.state.day_card_renew+1})
    // console.log (arr)

  }

  handleChosen = (recipe) =>{
    let arr = this.state.recipes
    arr.map(r => (r === recipe)? r.chosen = !r.chosen: r)
    //console.log(arr)
    this.setState({recipes: arr})
  }

  current_menu(){
    switch (this.state.menu){

      case "Home":
        return <DaysList handleAdd = {this.handleAdd} 
                        handleDelete={this.handleDelete}
                        days = {this.state.days} 
                        handleChangeView={this.changeView}
                        day_card_renew = {this.state.day_card_renew}/>
      case "Recipes":
        return <RecipesList recipes ={this.state.recipes} 
                            handleChangeView={this.changeView}
                            handleChosen={this.handleChosen}
                            handleAdd = {this.handleAdd}
                            show_recipes_add = {this.state.show_recipes_add}/> 
      case "Products":
          return <Products days = {this.state.days}/>
      case "About":
      console.log("in switch about")
          return <About />
      default:
        return <DaysList handleAdd = {this.handleAdd} 
                        handleDelete={this.handleDelete}
                        days = {this.state.days} 
                        handleChangeView={this.changeView}/>
    }


  }

  render(){
    //console.log(this.state.days)
    return (
      <div className="App "> 

        <Header changeView = {this.changeView}/>
        {

          this.current_menu()
        }
        

      </div>
    );
  }
  
}


