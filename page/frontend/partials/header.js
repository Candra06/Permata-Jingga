import React, { Component } from 'react';
// import pages
import {Link} from "react-router-dom";
import logo from "./../../../asset/img/logo.png"
class Header extends Component {
  state = {
    cls:"main-header navbar navbar-fixed-top navbar-expand navbar-light",
    base_url:"",
    url:'',
    nort:localStorage.getItem("nort"),
    link:''
  }
  componentWillMount(){
    var pathArray = window.location.pathname.split( '/' );
    var secondLevelLocation = pathArray[0];
    var newPathname = "";
    for (var i = 0; i < pathArray.length; i++) {
      newPathname += "/";
      newPathname += pathArray[i];
    }
    this.setState({url:newPathname})
    if(newPathname !== '//'){
      this.setState({cls:"main-header navbar navbar-fixed-top navbar-expand navbar-light navbar-fixed shadow", base_url:"http://beta.wargaku.id/"})
    }
    console.log(newPathname)
    // if(this.state.nort === "1"){
      this.setState({link:'RT'+this.state.nort})
    // }
  }
  render() {
    let Navbar='';
    if(localStorage.getItem("nik") === null || localStorage.getItem("level") === null){
      Navbar = <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="">
          Akun
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="/SignIn" className="dropdown-item">

            <div className="media">
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Masuk
                </h3>
              </div>
            </div>

          </a>
        </div>
      </li>
    }else{
      Navbar = <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="">
          {localStorage.getItem("nama")}
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <a href="/redirectLink" className="dropdown-item">
          <div className="media">
            <div className="media-body">
              <h3 className="dropdown-item-title">
                Panel
              </h3>
            </div>
          </div>

        </a>
          <a href="/Logout" className="dropdown-item">
            <div className="media">
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Keluar
                </h3>
              </div>
            </div>
          </a>
        </div>
      </li>
    }

    let nav='';
    if(this.state.url !== "//" && this.state.url !== "//qurban"){
      nav = (
        <ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<a className="nav-link" href={"/"+this.state.link}>Beranda <span className="sr-only">(current)</span></a>
						</li>
            {/* <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={"/"+this.state.link+"/#gallery"}>Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={"/"+this.state.link+"/#blog"}>Blog</a>
            </li> */}
            <li className="nav-item">
            {/* <a className="nav-link js-scroll-trigger" href="/#blog">Blog</a> */}
            <Link className="nav-link js-scroll-trigger"  to={"/PengurusRT/"+this.state.link} >Pengurus</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link js-scroll-trigger"  to={"/Pengajuan/"+this.state.link} >Pengajuan</Link>
              {/* <a className="nav-link js-scroll-trigger" href="/Pengajuan">Pengajuan</a> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link js-scroll-trigger" href="/Agenda">Agenda</a> */}
              <Link className="nav-link js-scroll-trigger"  to={"/Agenda/"+this.state.link} >Agenda</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={"/"+this.state.link+"#gallery"}>Galeri</a>
              {/* <Link className="nav-link js-scroll-trigger"  to={"/"+this.state.link+"#gallery"} >Galeri</Link> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link js-scroll-trigger"  to={"/ProgramKerja/"+this.state.link} >Program Kerja</Link>
              {/* <a className="nav-link js-scroll-trigger" href="/ProgramKerja">Program Kerja</a> */}
            </li>            
						{Navbar}
					</ul>
      )
    }else{
      nav = <ul className="navbar-nav ml-auto">
            <li className="nav-item">
						<Link className="nav-link js-scroll-trigger"  to="/" >Beranda</Link>
              {/* <a className="nav-link js-scroll-trigger" href="/Pengajuan">Pengajuan</a> */}
            </li>
            <li className="nav-item">
            <Link className="nav-link js-scroll-trigger"  to={"/qurban"} >Qurban</Link>
              {/* <a className="nav-link js-scroll-trigger" href="/Pengajuan">Pengajuan</a> */}
            </li>
            {Navbar}
					</ul>
    }
    return (
      <div>
      <div className='clear'></div>
      <nav id="mainNav" className="navbar navbar-expand-lg navbar-light shadow bg-white navbar-padding navbar-front">
				<a className="navbar-brand js-scroll-trigger" href="/"><img src={logo}/></a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
					{nav}
				</div>
			</nav>
      </div>
    );
  }
}

export default Header;
