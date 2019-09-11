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
        days: [],  //our untauchable array
        recipes: [],
        show_recipes: false,
        show_recipes_add: false,
        limit_for_today: 5,
        menu: "Home",
        edit_day:"",
        day_card_renew:0,
        username:"",
        password:"",

      }
  }

  componentDidMount(){ 

    if (this.state.username !== "") {
      //console.log()
       fetch(URL + "recipes", {
                  method: "GET",
                  headers:{
                    Authorization: `Bearer ${localStorage.token}`
                  }
                })
        .then(res => res.json())
        .then(res => {
           // console.log(res)
              res.map (r => r.chosen = false)
              this.setState({recipes: res})
            })

    fetch(URL + "mealplan")
      .then(res => res.json())
      .then(res => {
          //console.log(res)
            this.setState({days: res})
          })
    }  else{

    }
   

   
  }


  changeView = (menu) => {
    this.setState({menu: menu}, console.log(this.state.menu))
  }

  fetch_post(mealplan, recipe){
    // let new_meal = {}
    return fetch(URL + "meals", {
            method: 'POST', 
            body: JSON.stringify({
              mealplan_id: mealplan.id,
              recipe_id: recipe.id 

            }), 
            headers:{
              'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.token}`
            }
          }).then(res => res.json())
          .then(response => {

                  mealplan.meals.push({"id":response.id, "name":"Meal", "recipe":recipe});
                  console.log(mealplan)
                  return mealplan
                })
          .catch(error => console.error('Error:', error));
  }

  handleAdd = ( day) =>{
    
   // console.log(day)
    if (!this.state.show_recipes_add){
      let edit_day = this.state.days.filter(d => d.days === day)
      //console.log(edit_day[0])
        this.setState({menu: "Recipes", show_recipes_add: true, 
                      limit_for_today: 5 - edit_day[0].meals.length})
        this.setState({edit_day: day})
    }else{
        let chosen_recipes = this.state.recipes.filter(r => r.chosen === true)
      
        let arr = this.state.days
        let adding_day = arr.filter(d => d.days === this.state.edit_day)

        
        for (var i = 0; i < chosen_recipes.length; i++) {
            // console.log(adding_day[0].id)
            // console.log(chosen_recipes[i].id)

            //adding_day[0].meals.push({ "name":"Meal", "recipe":chosen_recipes[i]})

            this.fetch_post(adding_day[0], chosen_recipes[i])
            .then(new_mealplan => {
                                  console.log(new_mealplan);
                                  adding_day[0] = new_mealplan
                                  
                                  let unchosen_recipes = this.state.recipes.map(res => {res.chosen = false; return res})   
                                  arr.map(day => (day.days === this.state.edit_day)? day = adding_day: day)

                                  this.setState({menu: "Home", show_recipes_add: false, days:arr, recipes: unchosen_recipes,day_card_renew: this.state.day_card_renew+1}, 
                                    console.log(this.state.days))
                                    return new_mealplan
                              })
            


        }
        

        

        }
  }

  fetch_delete(meal_id) {
    console.log("in delete meal_id " + meal_id)
    fetch(URL + `meals/${meal_id}`, {
            method: 'DELETE', 
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`
            }
          }).then(res => res.json())
          .then(response => console.log('Success:'))
          .catch(error => console.error('Error:', error));
  }

  handleDelete = (recipe, id, day) => {
   
    let arr = this.state.days.map(d => {  //walking through days
                                          if (d.days === day) { //found name of the day
                                             let meal_id =  d.meals.find((m, index)=> id === index) //found exact meal s id
                                              d.meals = d.meals.filter((m, index)=> id !== index) //filtered out yhis exact meal from FE arr
                                             console.log(meal_id)
                                              this.fetch_delete(meal_id.id) //deleting this id from BE
                                              

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

  handleLogin = (login) =>{
    console.log(login.username)
    console.log(login.password)

    this.setState({username:login.username, password:login.password})

    // fetch('http://localhost:3000/create-account', {
    //         method: 'POST',
    //         headers: {
    //             'Content_Type': 'application/json'
    //         }, 
    //         body: JSON.stringify({
    //             username: login.username,
    //             password: login.password
    //         })
    //     })
    //     .then(res => console.log(res))

    fetch('http://localhost:3000/users/authenticate', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: login.username,
            password: login.password
          })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.token = data.token
            console.log(data.token)
            
            fetch(URL + "recipes", {
                  method: "GET",
                  headers:{
                    Authorization: `Bearer ${localStorage.token}`
                  }
                })
              .then(res => res.json())
              .then(res => {
                  console.log(res)
                    res.map (r => r.chosen = false)
                    this.setState({recipes: res})
                  })

              fetch(URL + "mealplan", {
                  method: "GET",
                  headers:{
                    Authorization: `Bearer ${localStorage.token}`
                  }
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                      this.setState({days: res})
                    })


        })

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
                            show_recipes_add = {this.state.show_recipes_add}
                            limit_for_today = {this.state.limit_for_today}/> 
      case "Products":
          return <Products days = {this.state.days}/>
      case "About":
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

        <Header changeView = {this.changeView} handleLogin = {this.handleLogin}/>
        {

          this.current_menu()
        }
        

      </div>
    );
  }
  
}


