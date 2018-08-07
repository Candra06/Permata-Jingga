import React, { Component } from 'react';
import logo_white from "./../../../asset/img/img_white.png";
import { RefRT, RefKK} from '../../../db';
class Footer extends Component {
  state = {
    base_url:"http://beta.wargaku.id/",
    alamat:'',
    email:'',
    phone:''
  }
  componentDidMount(){
    var pathArray = window.location.pathname.split( '/' );
    var secondLevelLocation = pathArray[0];
    var newPathname = "";
    for (var i = 0; i < pathArray.length; i++) {
      newPathname += "/";
      newPathname += pathArray[i];
    }
    console.log(newPathname)
    this.setState({url:newPathname})
    if(newPathname === '//' || newPathname === "//qurban"){
      RefKK.on("value", snap => {
        snap.forEach(shot =>{
          this.setState({alamat:shot.val().alamat, email:"permatajingga@gmail.com", phone:"082982398293838"})
        })
      })
    }else{
      RefRT.orderByChild("no").equalTo(parseInt(localStorage.getItem("nort"))).on("value", snap => {
        snap.forEach(shot =>{
          this.setState({email:shot.val().email, alamat:shot.val().alamat, phone:shot.val().nohp})
        })
      })
    }
  }
  render() {
    return (
			<footer className="page-footer font-small blue top-80 shadow-card">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-padding">
            <h4><img src={logo_white} className="img-responsive"/></h4>
            <p>We hold a passion for innovation, brilliant ideas and the execution that brings them all together in one beautiful experience</p>
          </div>
          <div className="col-md-4">
            <h4>Postingan Terbaru</h4>
            <div className="row">

              <div className="col-md-12">
                <p>Pengertian Biaya Akad</p>
              </div>
              <div className="col-md-12">
                <p>Belajar Tentang Kehidupan</p>
              </div>
                
            </div>
          </div>
          <div className="col-md-4">
            <h4>Kontak Kantor</h4>
            <p><i className='fa fa-map-marker'></i> {this.state.alamat}</p>
            <p><i className='fa fa-envelope'></i> {this.state.email}</p>
            <p><i className='fa fa-phone'></i> {this.state.phone}</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">Copyright © 2018  
        <a href="#"> Permata Jingga</a>
      </div>

    </footer>
    );
  }
}

export default Footer;
