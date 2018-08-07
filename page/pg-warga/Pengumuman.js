import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPengumumanPribadi from "./page/DataPengumuman/daftarpengumumanpribadi";

import { RefUser } from './../../db';

class Pengumuman extends Component {
  
  state = ({ niklogin : '3511112211990001'});
  
  componentDidMount() {
    RefUser.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        this.setState({ email: shot.val().email, tempemail: shot.val().email,  pwlama: shot.val().password, kunci: shot.key});
      });
      this.setState({ tasks});
    });
  }
 
  render() {
   
    return (
        <div className="wrapper">

          <Nav/>
          

          <Layout/>
        
          <div className="content-wrapper">

            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Pengumuman Pribadi</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="">Home</a></li>
                      <li className="breadcrumb-item active">Pengumuman Pribadi</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            
            <section className="content">
              <div className="container-fluid">

                <div className="row">

                  <div className="col-md-12">

                    <div className="card">

                      <div className="card-body">
                        <div className="tab-content">

                          <ListPengumumanPribadi/>
                           
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </section>
              </div>
                    
          <Footer/>
        
        </div>
    );
  }
}
 
export default Pengumuman;