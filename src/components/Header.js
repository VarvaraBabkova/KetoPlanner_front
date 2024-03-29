import React from "react"

export default class Header extends React.Component{


 constructor(props) {
    super(props);

    this.state = {
      username:"Varvara",
      password:"123456",
      form_button: "Log in"
    };
  }

handleUserInputChange = event => {
    this.setState({
      username: event.target.value,
    });
  }

handlePassInputChange = event => {

    this.setState({
      password: event.target.value,
    });
  }

preHandle = (e) =>{
  e.preventDefault()
  let usr = this.state.username
  let pwd = this.state.password
  if ((usr != "") && (pwd != ""))
  {

  	    this.props.handleLogin(this.state)
  	    this.setState({username:"", password:"", form_button:"Log out"})

  }else{
  	if (this.state.form_button === "Log out") {
  		this.setState({username:"Varvara", password:"123456", form_button:"Log in"})
  		//localStorage.removeItem('token');

  	}
  }
}

	render(){
		//console.log(this.props)
		 return(
		 <div>
	 	
				<div className="header">
				 <div className="doily"></div>
					<div className="login_form">
						<form onSubmit={e => this.preHandle(e)}>
					        <div>
					          <label>
					            Username
					            <input id="username" name="username" type="text" 
					            onChange={this.handleUserInputChange} value={this.state.username}/>
					          </label>
					        </div>
					        <div>
					          <label>
					            Password
					            <input id="password" name="password" type="password" 
					            onChange={this.handlePassInputChange} value={this.state.password}/>
					          </label>
					        </div>
					        <div>
					          <button type="submit">{this.state.form_button}</button>
					        </div>
					     </form>

					</div>

					<div className="header_brown">

						<h1 >Keto Meal Planner</h1>
						<div className="menu menu_btn1" onClick={() => this.props.changeView("Home")}>
							<br/>Home
						</div>
						<div className="menu menu_btn2" onClick={() => this.props.changeView("Recipes")}>
							<br/>Recipes
						</div>
						<div className="menu menu_btn3" onClick={() => this.props.changeView("Products")}>
							<br/>Products
						</div>
						<div className="menu menu_btn4" onClick={() => this.props.changeView("About")}>
							<br/>About
						</div>
					</div>

				</div>
			</div>

		)
	}

}