import React, { Component } from 'react';
// content
import orderBy from 'lodash/orderBy';
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import { Refkeuangan, Refpemasukan, Refpengeluaran } from './../../../db';
var NumberFormat = require('react-number-format');
class Keuangan extends Component {
  constructor(){
    super();
    this.state = {
        total:0,
        pemasukan:0,
        pengeluaran:0,
        taskspengeluaran:[],
        jumlahPengeluaran:0
    }

  }
  componentDidMount(){
    Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap => {
        snap.forEach(shot => {
            this.setState({total:shot.val().jumlah_saldo})
        })
    })
    let tgl = new Date();
    Refpemasukan.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap => {
        let pemasukan = 0;
        let tanggal = (tgl.getMonth()+1)
        snap.forEach(shot => {
            // console.log(tanggal.toString().length === 1 ? "0"+tanggal : tanggal)
            // if(shot.val().tanggal === tgl.getFullYear()+"-"+(tanggal.toString().length === 1 ? "0"+tanggal : tanggal)+"-"+tgl.getDate()){
                pemasukan=(pemasukan+parseInt(shot.val().jumlah_uang))
            // }
        })
        this.setState({pemasukan:pemasukan})
    })
    Refpengeluaran.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap => {
        let no=1;
        snap.forEach(shot => {
            no++;
        })
        this.setState({jumlahPengeluaran:no})
    })
    Refpengeluaran.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap => {
        let pengeluaran = 0;
        let tanggal = (tgl.getMonth()+1);
        const taskspengeluaran = [];
        let no=1;
        snap.forEach(shot => {
            // console.log(tanggal.toString().length === 1 ? "0"+tanggal : tanggal)
            // if(shot.val().tanggal === tgl.getFullYear()+"-"+(tanggal.toString().length === 1 ? "0"+tanggal : tanggal)+"-"+tgl.getDate()){
                taskspengeluaran.push({...shot.val(), key:shot.key, no:no})
                pengeluaran=(pengeluaran+parseInt(shot.val().jumlah_uang))
            // }
            no++;
        })
        this.setState({pengeluaran:pengeluaran, taskspengeluaran})
    })
  }
  render() {
    const orderedTasks = orderBy(
      this.state.taskspengeluaran
    );
    return (
     <div className='home '>
		 <Header/>
            <div className='container top-50'>
                <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" href="#pemasukan" role="tab" data-toggle="tab">Pemasukan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#pengeluaran" role="tab" data-toggle="tab">Pengeluaran</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#total" role="tab" data-toggle="tab">Total Saldo</a>
                </li>
                </ul>
                <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active active show" id="pemasukan">
                    <div style={{padding:5+"%"}} className='text-center text-warning'>
                        <h1>Pemasukan</h1>
                        <h1><NumberFormat value={this.state.pemasukan} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h1>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="pengeluaran">
                    <div style={{padding:5+"%"}} className='text-center text-warning'>
                        <h1>Pengeluaran</h1>
                        <h1><NumberFormat value={this.state.pengeluaran} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h1>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Pembuat</th>
                                <th scope="col">Keperluan</th>
                                <th scope="col">Jumlah Uang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderedTasks.map(task => (
                                    <tr>
                                        <th scope="row">{task.no}</th>
                                        <td>{task.nama_pembuat}</td>
                                        <td>{task.keperluan}</td>
                                        <td> <NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="total">
                    <div style={{padding:5+"%"}} className='text-center text-warning'>
                        <h1>Total Saldo</h1>
                        <h1><NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></h1>
                    </div>
                </div>
                </div>
            </div>
		<Footer/>
     </div>
    );
  }
}

export default Keuangan;
