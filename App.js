import React, {Component} from 'react';
import Routes  from './routes';
import {Redirect} from 'react-router-dom';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      link:'',
      redirect:false
    }
  }
  componentWillMount(){
    // console.log(localStorage.getItem('level'));
    // if(localStorage.getItem('level') === null){
    //   this.setState({link:"/"});
    //   this.setState({redirect:true});
    //   console.log("anda harus login");
    // }else if(localStorage.getItem("level") === "RT"){
    //   this.setState({link:"/RT/Home"});
    //   this.setState({redirect:true});
    //   console.log("RT");
    // }else if(localStorage.getItem("level") === "Admin"){
    //   this.setState({link:"/Admin/Home"});
    //   this.setState({redirect:true});
    //   console.log("ADMIN");
    // }else if(localStorage.getItem("level") === "Warga"){
    //   this.setState({link:"/Warga/Home"});
    //   this.setState({redirect:true});
    //   console.log("Warga");
    // }else if(localStorage.getItem("level") === "RW"){
    //   this.setState({link:"/RW/Home"});
    //   this.setState({redirect:true});
    //   console.log("RW");
    // }
  }
  render(){
    // if(this.state.redirect){
    //    return (<Redirect to={this.state.link}/>)
    // }
    // if(this.state.redirect){
    //     return (<Redirect to={this.state.link}/>)
    // }
    return(
      <div className="App">
     <Routes/>
    </div>
    )

    }
}
export default App;
