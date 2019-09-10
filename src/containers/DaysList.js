import React from "react"
import DayCard from "../components/DayCard"

export default class DayList extends React.Component{

		constructor(props){
			super(props)
			this.state = {
				girl_visibility: true
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

		console.log('the scroll things',  scrolled)
			if (scrolled === 1) {
				this.setState({
				    girl_visibility: false,
				  })
			}
			if (scrolled === 0 ) {
				this.setState({
				    girl_visibility: true,
				  })
			}

		  
		};

	render(){
		console.log("In days List")
		let girl_class = (this.state.girl_visibility)? "day_list_girl": "day_list_girl invisible"
				console.log(girl_class)

		 return(
			<div className="days_list clearfix">
				
				{
					this.props.days.map(day => <DayCard handleAdd = {this.props.handleAdd} 
														handleDelete={this.props.handleDelete} 
														key = {day.days} 
														day = {day}
														day_card_renew = {this.props.day_card_renew}/>)
				}
				<div className={girl_class}></div>
			</div>
		)
	}

}

//				<input className="box_btn" type="image" src={require('../RecipesBox.png')} onClick={this.props.handleChangeView} />
