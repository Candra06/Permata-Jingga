import React, { Component } from 'react';
// content
import {Link} from "react-router-dom";
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import cow from "../../../asset/img/cow.png"
import { RefQurban } from './../../../db';
import orderBy from 'lodash/orderBy';
import { ToastContainer, toast } from 'react-toastify';
import { rootRef } from '../../../db';
// import InfiniteScroll from 'react-infinite-scroller';
var NumberFormat = require('react-number-format');
class Qurban extends Component {
  constructor(){
	super();
	this.state = {
		tasks:[],
		gridnumber:0,
		tasksGallery:[],
        data:[],
        showalert: 'hide', 
        showalertnik: 'hide', 
        lihatbtn: '',
        teksalert:'',  
        tasksrt:[],   
        no_rt:0,
        nama:'',
        jenis:'',
        type:'',
        request:'',
        pembayaran:'',
        nomor:'',
        alamat:'',
        tgl_bayar:'',
        status:'',
        contentDisplay:false,
        search:'',
        items: 10,
        jumlah:0
	}

  }
  componentDidMount(){
      localStorage.setItem("nort", '')
      RefQurban.on("value", snap =>{
        let no = 1;
        snap.forEach(shot => {
          no++;
        })
        this.setState({ jumlah:no });
      })
      RefQurban.limitToFirst(this.state.items).on("value", snap =>{
        const tasks=[]
        let no=1;
        snap.forEach(shot => {
          tasks.push({...shot.val(), key:shot.key, no:no})
          no++;
        })
        this.setState({tasks})
    })
    document.addEventListener("scroll", () => {
        console.log("============LOAD MORE==============="+this.state.items+" ========= "+this.state.jumlah)
        if(this.state.items <= this.state.jumlah){
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
              this.loadMore();
          }
        }
    });
  }
  loadMore() {
    console.log("====INI Di Load More====="+this.state.items)
    
    let number = (this.state.items+10);
    this.setState({items:number, loading: true})
    RefQurban.limitToFirst(number).on('value', snap => {
      const tasks = [];
      let no = 1;
      snap.forEach(shot => {
        tasks.push({...shot.val(), key:shot.key, no:no})
        no++;
      })
      this.setState({ tasks, tasksLoading: false, loading:false });
    });
  }
  handleFilter = event => {
    this.setState({ search: event.target.value });
    };
  tambahwarga = ()=>{
    this.setState({ addwarga: !this.state.addwarga})
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
        if(event.target.name === "type"){
            console.log("type "+this.state.hewan)
            if(this.state.hewan === 'Sapi'){
                console.log("valuenya ===== "+event.target.value)
                if(event.target.value === "Reguler"){
                    console.log("reguler")
                    this.setState({pembayaran:2500000})
                }else if(event.target.value === "Super"){
                    this.setState({pembayaran:3250000})
                }else if(event.target.value === "Exclusive"){
                    this.setState({pembayaran:5000000})
                }
            }else if(this.state.hewan === 'Kambing'){
                if(event.target.value === "Reguler"){
                    this.setState({pembayaran:2500000})
                }else if(event.target.value === "Super"){
                    this.setState({pembayaran:3250000})
                }else if(event.target.value === "Exclusive"){
                    this.setState({pembayaran:3500000})
                }
            }
        }
    }
  

    handleResetWarga = event => {
        event.preventDefault();
        this.setState({ judul: '' });
    }
    HandleTambahWarga(type){
        return () => {
                if(this.state.judul === ""){
                    toast.warn('Judul Harus diisi', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }else{
                    this.setState({contentDisplay:true});
                    const htg = {
                        nama: this.state.nama.trim(),
                        alamat: this.state.alamat.trim(),
                        hewan: this.state.hewan.trim(),
                        type: this.state.type.trim(),
                        request: this.state.request.trim(),
                        nomor: "-",
                        pembayaran: this.state.pembayaran,
                        tgl_bayar: "-",
                        status: "Belum Lunas",
                    }; 
                        rootRef.child('Qurban').push(htg);
                        console.log(htg);
                        this.setState({ nama: '', alamat:'',hewan:'',type:'',request:'',nomor:'',pembayaran:'',
                        tgl_bayar:'',status:'',
                        lihatbtn: '',
                        progress:0, 
                        showalert: 'hide', 
                        showalertnik: 'hide', 
                        addwarga: false});
                        toast.success('Data Berhasil Di Simpan', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                        
                    }
        };
      };
  render() {
	const orderedTasks = orderBy(
        this.state.tasks.filter(
            (ls) => {
              return ls.nama.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1 || ls.hewan.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1 || ls.status.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
            }
          )
      );
      const{showalert, teksalert, showalertnik, hewan } = this.state;
      let cekalert, lettambahwarga, letbtntambah, pilih_type;
      if(showalert === 'hide' && showalertnik === 'hide'){
  
      }else if(showalert === 'block'){
          cekalert = (
          <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
            {teksalert}
          </div>
          )
      }else if(showalertnik === 'block'){
          cekalert = (
              <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
                {teksalert}
              </div>
            )
      }
  
      if(hewan === 'Kambing'){
          pilih_type = (
              <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                  <option value="">Pilih Type</option>
                  <option value="Reguler">Reguler</option>
                  <option value="Exclusive">Extra</option>
                  <option value="Super">Super</option>
                  
              </select>
          )
      }else if(hewan === 'Sapi'){
          pilih_type = (
              <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                  <option value="">Pilih Type</option>
                  <option value="Reguler">Reguler</option>
                  <option value="Super">Super</option>
                  <option value="Exclusive">Exclusive</option>
                  
              </select>
          )
      }else{
          pilih_type = (
              <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                  <option value="">Pilih Type</option>
                  <option value="Reguler">Reguler</option>
                  <option value="Exclusive">Extra</option>
                  <option value="Super">Super</option>
                  <option value="Jumbo">Jumbo</option>
                  
              </select>
          )
      }
     
      if(this.state.contentDisplay){
        letbtntambah = (
            <div className="form-control">
                <div className="card-body">
                    <div className="row ">
                        <p>Data berhasil disimpan. Mohon untuk menkonfirmasi Pembayaran Qurban anda melalui panitia qurban.</p>
                        <b className='col-md-12'>1. Pak Rusdi /081333441144</b>
                        <b className='col-md-12'>2.Pak Basir/081333292666</b>
                    </div>
                </div>
            </div>
            )
        }else{
            lettambahwarga = (
                <div className="form-control top-50">
                    <div className="card-body">
                        <div className="row">
                              <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                      <label>Nama<sup>*</sup></label>
      
                                      <input type="text"
                                      name="nama"
                                      onChange={this.handleChange}
                                      value={this.state.nama}
                                      className="form-control" placeholder="Masukkan Nama Warga" style={{height: 3 + 'em'}}/>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                      <label>Alamat<sup>*</sup></label>
      
                                      <input type="text"
                                      name="alamat"
                                      onChange={this.handleChange}
                                      value={this.state.alamat}
                                      className="form-control" placeholder="Masukkan Alamat" style={{height: 3 + 'em'}}/>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                      <label>Jenis Hewan<sup>*</sup></label>
      
                                      <select className='form-control' required onChange={this.handleChange} name="hewan" value={this.state.hewan} style={{height: 3 + 'em'}}>
                                          <option value="">Pilih Hewan</option>
                                          <option value="Sapi">Sapi</option>
                                          <option value="Kambing">Kambing</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                      <label>Type<sup>*</sup></label>
                                          { pilih_type }
                                  </div>
                              </div>
                              <div className="col-md-4">
                                  <div className="form-group col-md-12">
                                      <label>Request<sup>*</sup></label>
                                      <textarea name="request" className='form-control' style={{height: 3 + 'em'}} placeholder="Masukkan Permintaan" onChange={this.handleChange} value={this.state.request}></textarea>
                                  </div>
                              </div>
                      </div>
                    </div>
                    <div className="card-footer col-12">
                        <button type="submit" className="btn btn-warning" id={this.state.lihatbtn} onClick={this.HandleTambahWarga('success')}>Tambahkan</button>
                        <span>  </span>
                        <button type="reset" className="btn btn-warning"  onClick={this.handleResetWarga}>Reset</button>
                    </div>
                </div>
            )
        }
        
    return (
     <div className='home'>
		 <Header/>
        <div className="banner relative overflow bg-warning-gradient banner-qurban" style={{zIndex:-2}}>
            <div className=" banner-content">
            <div className="row">
                <div className="col-md-6 p-content">
                <h1 className='text-white' style={{fontSize:58+"px!important"}}>Ayo Berqurban Untuk Akhirat Anda</h1>
                <p className='text-white desc'>Masjid permatajingga (Cahyaningati dan abdullah) Menerima dan Menyalurkan Hewan Qurban. 
Dalam rangka menyambut hari raya idul Adha 1439 H, Masjid permatajingga (Cahyaningati dan abdullah) insya Allah akan melaksanakan 
kegiatan pemotongan dan Penyaluran Hewan Qurban.Dengan ini membuka seluas luasnya nya bagi saudara saudara semua nya yg ingin menyalurkan Herwan kurbannya di Masjid permatajingga (Cahyaningati dan abdullah), 
insya Allah hewan kurban yg telah di sembelih akan di salurkan ke panti asuhan dan kaum dhuafa.</p>
                {/* <Link className="nav-link js-scroll-trigger"  to={"/Pengajuan/"+this.state.link} ><button type="button" name="button" className="btn btn-banner">Get Started</button></Link> */}
                </div>
                <div className="col-md-6">
                <img src={cow} className="img-responsive img-cow right"/>
                </div>
            </div>
            </div>
        </div>
        <div className='clear'></div>
        <div className='banner-top bg-white shadow text-center'>
            <div className='row'>
                <div className='col-md-4'>
                    <h4>Sapi Reguler</h4>
                    <p>Rp. 2.650.000</p>
                </div>
                <div className='col-md-4'>
                    <h4>Sapi Super</h4>
                    <p>Rp. 3.450.000</p>
                </div>
                <div className='col-md-4'>
                    <h4>Sapi Jumbo</h4>
                    <p>Rp. 5.200.000</p>
                </div>
                <div className='col-md-4'>
                    <h4>Kambing Reguler</h4>
                    <p>Rp. 2.650.000</p>
                </div>
                <div className='col-md-4'>
                    <h4>Kambing Extra</h4>
                    <p>Rp. 3.400.000</p>
                </div>
                <div className='col-md-4'>
                    <h4>Kambing Super</h4>
                    <p>Rp. 3,650,000,- ~ Rp. 4,150.000</p>
                </div>
            </div>
        </div>
        <div className="container" id="qurban">
            <div className="title text-center">
                <h1>Form Qurban</h1>
            </div>
            {letbtntambah}
            {lettambahwarga}
            <div className="title text-center top-80">
                <h1>Shahibul Qurban</h1>
            </div>
            <div className='row top-50'>
            <div className='table-responsive'>
            <div className='col-md-4 float-right' style={{padding:12+"px"}}>
                <input type='text' className='form-control' placeholder='Masukkan Keyword' value={this.state.search} onChange={this.handleFilter}/>
            </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Hewan</th>
                        {/* <th scope="col">Request</th> */}
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedTasks.map(task => (
                            <tr>
                                <th scope="row">{task.no}</th>
                                <td>{task.nama}</td>
                                <td>{task.hewan} ( {task.type} )</td>
                                {/* <td>{task.request}</td> */}
                                <td>{task.status}</td>
                            </tr>
                        ))}
                        {this.state.loading
                            ? <p className="App-intro">
                                loading ...
                                </p>
                            : ""}
                    </tbody>
                </table>
            </div>
            {/* {orderedTasks.map(task => (
                <div className="col-md-3">
                    <div className="qurban-list">
                    <div className="card-body">
                        <h5 className='text-center'>{task.judul}</h5>
                        <p className="text-gray font-sm top-10">
                        Nama : {task.nama}</p>
                        <p className="text-gray font-sm">Hewan : {task.hewan}</p>
                        <p className="text-gray font-sm">No Hewan : {task.nomor}</p>
                        <p className="text-gray font-sm">Jumlah Dana : {task.pembayaran}</p>
                        <p className="text-gray font-sm">Request : {task.request}</p>
                        <p className="text-gray font-sm">Status : {task.status}</p>
                        <p className="text-gray font-sm">type : {task.type}</p>
                    </div>
                    </div>
                </div>
            ))} */}
            </div>
        </div>
        <Footer/>
     </div>
    );
  }
}

export default Qurban;
