import React, { Component } from 'react';
import {Link} from "react-router-dom";
import meeting from "../../../asset/img/meet.jpg"
import tutorial from "../../../asset/img/tutorial.jpg"
import tutorial1 from "../../../asset/img/tutorial1.jpg"
import keuangan from "./../../../asset/img/keuangan.png"
class Banner extends Component {
  constructor(){
    super()
    this.state = {
      nort:localStorage.getItem("nort"),
      link:'',
      url:''

    }
  }
  componentDidMount(){
    this.setState({link:'RT'+this.state.nort});
    var pathArray = window.location.pathname.split( '/' );
    var secondLevelLocation = pathArray[0];
    var newPathname = "";
    for (var i = 0; i < pathArray.length; i++) {
      newPathname += "/";
      newPathname += pathArray[i];
    }
    this.setState({url:newPathname})
    // if(newPathname !== '//'){
    //   this.setState({cls:"main-header navbar navbar-fixed-top navbar-expand navbar-light navbar-fixed shadow", base_url:"http://beta.wargaku.id/"})
    // }
  }
  render() {
    let btn1='', btn2='', banner='';
    if(this.state.url === "//"){
      btn1 = '';
      btn2 = '';
      banner = <div className="carousel-item">
          <img className="d-block w-100" src={tutorial1} alt="First slide"/>
          <div className="carousel-caption d-none d-md-block">
              {/* <h2>Pengajuan Surat Pengajuan</h2>
              <p>warga Permata Jingga bisa mengajukan permohonan surat keterangan RT/RW secara online</p>
              {btn1} */}
          </div>
      </div>
    }else{
      btn1 = <Link className="nav-link js-scroll-trigger"  to={"/Pengajuan/"+this.state.link} ><button type="button" name="button" className="btn btn-banner">Mulai Pengajuan</button></Link>;
      btn2 = <Link className="nav-link js-scroll-trigger"  to={"/Keuangan/"+this.state.link} ><button type="button" name="button" className="btn btn-banner">Cek Keuangan</button></Link>;
      banner = 
      <div className="carousel-item">
          <img className="d-block w-100" src={tutorial} alt="First slide"/>
          <div className="carousel-caption d-none d-md-block">
              {/* <h2>Pengajuan Surat Pengajuan</h2>
              <p>warga Permata Jingga bisa mengajukan permohonan surat keterangan RT/RW secara online</p>
              {btn1} */}
          </div>
      </div>
    }
    return (
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={keuangan} alt="First slide"/>
            <div className="carousel-caption d-none d-md-block">
                <h2>Pengajuan Surat Pengajuan</h2>
                <p>warga Permata Jingga bisa mengajukan permohonan surat keterangan RT/RW secara online</p>
                {btn1}
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={meeting} alt="Second slide"/>
            <div className="carousel-caption d-none d-md-block">
                <h2>Transparansi Keuangan RT {localStorage.getItem("nort")}</h2>
                <p>warga Permata Jingga dapat memantau keuangan RT secara online setiap saat</p>
                {btn2}
            </div>
          </div>
          {banner}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Banner;
