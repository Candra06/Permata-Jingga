import React, { Component } from 'react';
// content

// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Validation from "../../../validation";
import Footer from "./../partials/footer"
import { RefRT, RefRW, RefNotif } from './../../../db';
import orderBy from 'lodash/orderBy';
import ListRT from "./listRT"
import Banner from "../partials/banner"
class HomePage extends Component {
  constructor(){
	super();
	this.state = {
		color:['#af1723', '#dc4029', '#e9ae0c', '#00a99d', '#ff8000','#ff8000','#53a655', '#07abde', '#8664b3', '#dc4b76', '#38444f'],
		tasks:[],
		grid:['4', '4', '4','6', '6', '6', '6', '4', '4', '4'],
		gridnumber:0,
		tasksGallery:[],
		data:[]
	}

  }
  componentDidMount(){
	localStorage.setItem("nort", '');
	RefRW.orderByChild("no").equalTo("6").on("value", snap => {
		snap.forEach(shot => {
			localStorage.setItem("namarw", shot.val().nama)
		})
	})
	RefRT.orderByChild("norw").equalTo("6").on("value", snap =>{
		let number=0;
			snap.forEach(shot =>{
				number=parseInt(shot.val().no);
				RefRT.child(shot.key).update({no:number});
		  })
	  })
	  RefRT.orderByChild("no").on("value", snap =>{
		const tasks=[]; 
		let color=0;
			snap.forEach(shot =>{
			  if(shot.val().norw === "6"){
				tasks.push({...shot.val(), key:shot.key, color:this.state.color[color], grid:this.state.grid[color]});
				color++;
			  }
		  })
		this.setState({tasks})
		});
		RefNotif.limitToLast(3).on("value", snap => {
			const data = [];
			snap.forEach(shot => {
				data.push({...shot.val(), key:shot.key})
				// console.log(shot.val())
			})
			this.setState({data});
		})
  }
  
  render() {
	const orderedTasks = orderBy(
		this.state.tasks,
		['no'],['asc']
	  );
	//   console.log(this.state.tasksGallery)
    return (
     <div className='home'>
     <Validation/>
		 <Header/>
		 <Banner/>
			<div className="top-80 menu container"  id="blog">
				<div className="title text-center">
					<h1>Menu Permatajingga.net</h1>
				</div>
				<div className="row top-50">
				{orderedTasks.map(task => (
					<ListRT task={task} key={task.key}/>
				))}
				</div>
			</div>
			<Footer/>
     </div>
    );
  }
}

export default HomePage;
