import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";

import { RefDeskripsi } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
class deskripsirt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kunci:'',
            deskripsi: ''};
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
        
      }


      componentWillMount(){
        this.tampildata();
      }

      tampildata = () => {
          RefDeskripsi.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
            snap.forEach(shot => {
                this.setState({
                    kunci:shot.key,
                    deskripsi:shot.val().deskripsi
                })
            })
        })
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({deskripsi:''});
      }

      notify(type){
        return () => {
            if(this.state.deskripsi === ""){
                toast.warn('Deskripsi tidak Boleh Kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              
            }else{
            const htg = {
                norw: localStorage.getItem("koderw"),
                deskripsi: this.state.deskripsi.trim(),
                nort: localStorage.getItem("idrt"),
              };
              if(this.state.kunci === ""){

                RefDeskripsi.push(htg);
                this.setState({deskripsi:''});
              }else{

                RefDeskripsi.child(this.state.kunci).update({
                    deskripsi: this.state.deskripsi
                });
                this.setState({deskripsi:''});
              }

            
                toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                this.tampildata();

                }
        };
      };

  render() {
    
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row"style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Deskripsi RT</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Deskripsi RT</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Deskripsi RT</h3>
                            
                        </div>
                        <div className="form-control">
                            <div className="card-body" style={{overflow: 'auto!important'}}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label>Deskripsi</label>
                                                <textarea
                                                onChange={this.handleChange}
                                                value={this.state.deskripsi}
                                                name="deskripsi"
                                                rows="5"
                                                className="form-control" placeholder="Masukkan Deskripsi"/>
                                           
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                 
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2000}
                                    />
                                </div>
                           
                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default deskripsirt;
