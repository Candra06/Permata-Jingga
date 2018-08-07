import React, { Component } from 'react';
// content
import meeting from "./../../../asset/img/meeting.png"
import meetingj from "./../../../asset/img/meeting.jpg"
import blog from "./../../../asset/img/blog.jpg"
import blog1 from "./../../../asset/img/blog1.jpg"
import statistic from "./../../../asset/img/statistic.png"
import warga from "./../../../asset/img/warga.png"
import man from "./../../../asset/img/rt.png"
import woman from "./../../../asset/img/woman.png"
import kk from "./../../../asset/img/kk.png"
import orderBy from 'lodash/orderBy';
import Banner from "../partials/banner"
import {Link} from "react-router-dom";
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import ListGaleri from "./listGaleri"
import ReactHtmlParser from 'react-html-parser';
import { RefKK, RefWarga, RefRT, RefRW, RefGaleri, RefDeskripsi, RefBlog } from './../../../db';
class RTHome extends Component {
  constructor(){
    super();
  this.state = ({ htgwarga : 0, htgkk:0, htgpria:0, htgwanita:0, htgrt:0,htgrw:0,
    modal: false,nort:localStorage.getItem("nort"), tasks:[],link:'', deskripsi:'', tasksBlog:[]});

  }
  componentDidMount(){
		var pathArray = window.location.pathname.split( '/' );
    var secondLevelLocation = pathArray[0];
		var newPathname = "";
		console.log(localStorage.getItem("nort"))
    for (var i = 0; i < pathArray.length; i++) {
      newPathname += "/";
      newPathname += pathArray[i];
    }
    this.setState({url:newPathname})
    if(newPathname !== '//'){
      this.setState({cls:"main-header navbar navbar-fixed-top navbar-expand navbar-light navbar-fixed shadow", base_url:"http://beta.wargaku.id/"})
    }
		RefDeskripsi.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap => {
			const tasks=[]
			snap.forEach(shot => {
				this.setState({deskripsi:shot.val().deskripsi})
			})
		})
    // if(this.state.nort === "1"){
		this.setState({link:'RT'+this.state.nort});
		RefBlog.on("value", snap => {
			const tasksBlog=[]
			snap.forEach(shot => {
				// console.log(shot.val())
				tasksBlog.push({...shot.val(), key:shot.key})
			})
			this.setState({tasksBlog});
		})	
		RefGaleri.orderByChild("no_rt").equalTo(parseInt(localStorage.getItem("nort"))).on("value", snap => {
			const tasks=[]
			snap.forEach(shot => {
				tasks.push({...shot.val(), key:shot.key})
			})
			this.setState({tasks});
		})
    let jmlwarga = 0, jmlPria=0, jmlWanita=0, jmlkk=0, jmlrt=0, jmlrw=0;
    RefWarga.orderByChild("nort").equalTo(this.state.nort).on('value', snap => {
      snap.forEach(shot => {
				if(shot.val().norw === '6'){
					jmlwarga++;
					if(shot.val().gender === "Laki-Laki"){
						jmlPria++;
					}else if(shot.val().gender === "Perempuan"){
						jmlWanita++;
					}
				}
      });
      this.setState({ htgwarga: jmlwarga, htgwanita:jmlWanita, htgpria:jmlPria});
    });
    RefRT.on('value', snap => {
      snap.forEach(shot => {
        jmlrt += 1;
      });
      this.setState({ htgrt: jmlrt});
    });
    RefRW.on('value', snap => {
      snap.forEach(shot => {
        jmlrw += 1;
      });
      this.setState({ htgrw: jmlrw});
    });
    RefKK.orderByChild("idrt").equalTo(this.state.nort).on('value', snap => {
      snap.forEach(shot => {
        jmlkk += 1;
      });
      this.setState({ htgkk: jmlkk});
    });
    // RefWarga.orderByChild("nort").equalTo(this.state.nort).on('value', snap => {
    //   snap.forEach(shot => {
    //     if(shot.val().gender === "Laki-Laki"){
    //       jmlPria+=1;
    //     }else if(shot.val().gender === "Perempuan"){
    //       jmlWanita+=1;
    //     }
    //   });
    //   this.setState({ htgpria: jmlPria, htgwanita:jmlWanita});
    // });
  }
  render() {
		const orderedTasks = orderBy(
      this.state.tasks
    );
    return (
     <div className='home'>
		 <Header/>
      <Banner/>
			<div className="container top-80" id="blog">
				<div className="title text-center">
					<h1>Blog</h1>
				</div>
				<div className="row top-50">
				{this.state.tasksBlog.map(task => (
					<div className="col-md-4" >
					<Link onClick={(e) =>localStorage.setItem("detail", task.key)} to={"/blog/"+(task.nama).replace(' ', '-')} >
						<div className="overflow">
							<div className="thumbnail bg-center relative shadow-card overflow" style={{background:"url("+task.urlfoto +")",height:350+"px",borderRadius:5+"px",}}>
								<h4 className="title-blog absolute text-white">{task.nama}</h4>
								<p className="font-small absolute">{ReactHtmlParser((task.deskripsi).substr(0,120))}...</p>
							</div>
						</div>
						</Link>
					</div>
					))}
					{/* // <div className="col-md-4" >
					// <Link onClick={(e) =>localStorage.setItem("detail", "Pengertian-Biaya-Akad")} to="/blog/Pengertian-Biaya-Akad" >
					// 	<div className="overflow">
					// 		<div className="thumbnail bg-center relative shadow-card overflow" style={{background:"url("+blog+")",height:350+"px",borderRadius:5+"px",}}>
					// 			<h4 className="title-blog absolute text-white">Pengertian Biaya Akad</h4>
					// 			<p className="font-small absolute">Apa itu Biaya Akad ? sebenarnya ini hanya istilah untuk menggabungkan biaya-biaya...</p>
					// 		</div>
					// 	</div>
					// 	</Link>
					// </div>
					// <div className="col-md-4">
					// <Link onClick={(e) =>localStorage.setItem("detail", "Definisi-Perumahan-Dan-Rumah")} to="/blog/Definisi-Perumahan-Dan-Rumah" >
					// 	<div className="overflow">
					// 		<div className="thumbnail bg-center relative shadow-card overflow" style={{background:"url("+blog1+")",height:350+"px",borderRadius:5+"px",}}>
					// 				<h4 className="title-blog absolute text-white">Definisi Perumahan Dan Rumah</h4>
					// 				<p className="font-small absolute">Perumahan dan kawasan permukiman adalah satu kesatuan sistem yang terdiri atas pembinaan...</p>
					// 		</div>
					// 	</div>
					// 	</Link>
					// </div>
					// <div className="col-md-4" >
					// <Link onClick={(e) =>localStorage.setItem("detail", "Belajar-Tentang-Kehidupan")} to="/blog/Belajar-Tentang-Kehidupan" >
					// 	<div className="overflow">
					// 		<div className="thumbnail bg-center relative shadow-card overflow" style={{background:"url("+meetingj+")",height:350+"px",borderRadius:5+"px",}}>
					// 				<h4 className="title-blog absolute text-white">Belajar Tentang Kehidupan</h4>
					// 				<p className="font-small absolute">Mari kita belajar Tentang kehidupan belajar bagaimana menyikapi cobaan agar tidak putus asa dari rahmat Tuhan...</p>
					// 		</div>
					// 	</div>
					// 	</Link>
					// </div> */}
					
				</div>
			</div>
			<div className="container top-80">
				<div className="title text-center">
					<h1>Info Warga</h1>
				</div>
				<div className="statistic">
					<div className="row">
						<div className="col-md-4">
								<img src={statistic} alt="" className="img-responsive img-sm-md"/>
						</div>
						<div className="col-md-8 text-center">
							<div className="row top-50">
								<div className="col-md-3">
									<img src={warga} className="img-responsive img-sm-md" alt=""/>
									<h1 className="text-warning title-xl">{this.state.htgwarga}</h1>
									<p>warga</p>
								</div>
								<div className="col-md-3">
									<img src={woman} className="img-responsive img-sm-md" alt=""/>
									<h1 className="text-warning title-xl">{this.state.htgwanita}</h1>
									<p>Perempuan</p>
								</div>
								<div className="col-md-3">
									<img src={man} className="img-responsive img-sm-md" alt=""/>
									<h1 className="text-warning title-xl">{this.state.htgpria}</h1>
									<p>Laki-Laki</p>
								</div>
								<div className="col-md-3">
									<img src={kk} className="img-responsive img-sm-md" alt=""/>
									<h1 className="text-warning title-xl">{this.state.htgkk}</h1>
									<p>KK</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container top-80" id="gallery">
				<div className="title text-center">
					<h1>Gallery</h1>
				</div>
				<div className="row top-50 gallery">
				{orderedTasks.map(task => (
					<ListGaleri task={task} key={task.key}/>
				))}
					{/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Popup image</button> */}

					
				</div>
			</div>
			<Footer/>
     </div>
    );
  }
}

export default RTHome;
