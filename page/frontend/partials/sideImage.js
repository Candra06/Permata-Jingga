import React, { Component } from 'react';
import Image from "../../../asset/img/bg1.jpg";
class SideImage extends Component {

  render() {
    return (
      <div className="container-fluid sideImage" id='about'>
       <div className="row">
        <div className="col-sm-6">
            <h2 className="title">Tentang Wargaku.id</h2>
            <p className="text-sm text-justify text-gray line">wargaku.com adalah aplikasi berbasis online yang menyediakan fasilitas bagi ketua RT dan RW untuk menerima permintaan dari masyarakat. wargaku.id memfasilitasi pak RT, pak RW dan masyarakat dalam berinteraksi</p>
        </div>
        <div className="col-sm-6">
            <img src="https://blogs.forbes.com/glennllopis/files/2018/02/shutterstock_1253381451.jpg" className="img-responsive" alt="Wargaku.id"/>
        </div>
       </div>
      </div>
    );
  }
}

export default SideImage;
