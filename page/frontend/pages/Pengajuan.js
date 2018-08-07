import React, { Component } from 'react';
// content
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import orderBy from 'lodash/orderBy';
import { rootRef, RefRT, timeRef, RefPengajuan, RefPengurus } from './../../../db';
import { ToastContainer, toast } from 'react-toastify';
class PengurusRT extends Component {
  constructor(){
    super();
  this.state = ({ focus:['',''],pk:'',nama:'',tasksek:[], nik:'',taskssek:[],no_telp:'', displayForm:false,pekerjaan:'', status:'', tempat_lahir:'', tgl_lahir:'', email:'', alamat:'', kebutuhan:'',
  id_penerima:'',nort:'',nosekr:'', emailrt:'', emailsekr:'', formVisible:1, namart:''});

  }
  componentDidMount(){
    // window.open('mailto:ludfyr@gmail.com?subject=subject&body=body');
    RefRT.orderByChild("no").equalTo(parseInt(localStorage.getItem("nort"))).on("value", snap => {
      snap.forEach(shot => {
        if(shot.val().norw === "6"){
        this.setState({id_penerima:shot.val().nik, nort:shot.val().nohp, emailrt:shot.val().email, namart:shot.val().nama})
        }
      })
    })
    RefPengurus.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap =>{
      const tasksek= [];
      snap.forEach(shot => {
        if(shot.val().jabatan === "Sekretaris"){
          console.log(shot.val());
          // this.setState({emailsekr:shot.val().email})
          tasksek.push({...shot.val(), key:shot.val().key})
        }
      })
      this.setState({tasksek});
    })
    const orderedTasksSek = orderBy(
      this.state.taskssek
    );
    
  }
  onChange = event => {
    this.setState({[event.target.name]:event.target.value});
    console.log(event.target.name)
    if(event.target.name === "nik"){
      RefPengajuan.orderByChild("nik").equalTo(event.target.value).on("value", snap => {
        let no=0;
        snap.forEach(shot =>{
          ++no;
          this.setState({nama:shot.val().nama, no_telp:shot.val().no_telp, pekerjaan:shot.val().pekerjaan, tempat_lahir:shot.val().tempat_lahir, tgl_lahir:shot.val().tgl_lahir, email:shot.val().email, alamat:shot.val().alamat})
        })
        // if(no < 1){
        //   this.setState({nama:'', no_telp:'', pekerjaan:'', tempat_lahir:'', tgl_lahir:'', email:'', alamat:''})
        // }
      })
    }else if(event.target.name === "nama"){
      RefPengajuan.orderByChild("nama").equalTo(event.target.value).on("value", snap => {
        let no=0;
        snap.forEach(shot =>{
          ++no;
          this.setState({nik:shot.val().nik, no_telp:shot.val().no_telp, pekerjaan:shot.val().pekerjaan, tempat_lahir:shot.val().tempat_lahir, tgl_lahir:shot.val().tgl_lahir, email:shot.val().email, alamat:shot.val().alamat})
        })
        // if(no < 1){
        //   this.setState({no_telp:'', pekerjaan:'', tempat_lahir:'', tgl_lahir:'', email:'', alamat:''})
        // }
      })
    }else if(event.target.name === "pekerjaan"){
      if(event.target.value === "Lain Lain"){
        this.setState({pekerjaan:''})
        this.setState({displayForm:true})
      }else{
        console.log(event.target.value)
        this.setState({pekerjaan:event.target.value})
        this.setState({displayForm:false})
      }
    }
  }
  notify = (e)=>{
    e.preventDefault();
      let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
                if(this.state.nik === ""){
                  toast.warn('NIK tidak boleh kosong', {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                    this.setState({focus:['nik','nik tidak boleh kosong']});
                    this.nik.focus();
              }else if(this.state.nama === ""){
                toast.warn('Nama tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['nama','nama tidak boleh kosong']})
                  this.nama.focus();
              }else if(!this.state.nama.match(/^[a-zA-Z]+$/) && !this.state.nama.match(" ")){
                toast.warn('Nama harus berisi huruf', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['nama','nama harus karakter']})
                  this.nik.nama();
            }else if(this.state.tempat_lahir === ""){
                toast.warn('Tempat Lahir tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['tempat_lahir','tempat lahir tidak boleh kosong']})
                  this.tempat_lahir.focus();
              }else if(this.state.tgl_lahir === ""){
                toast.warn('Tanggal Lahir tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['tgl_lahir','tanggal lahir tidak boleh kosong']})
                  this.tgl_lahir.focus();
              }else if(this.state.pekerjaan === "" && this.state.pk ===''){
                toast.warn('Pilih Pekerjaan', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['pekerjaan','pekerjaan tidak boleh kosong']})
                  this.pekerjaan.focus();
              }else if(this.state.email === ""){
                toast.warn('Email tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['email','email tidak boleh kosong']})
                  this.email.focus();
              }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                toast.warn('Email tidak valid', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['email','email tidak valid']})
                  this.email.focus();
              }else if(this.state.no_telp === ""){
                toast.warn('No Telphone Tidal Boleh Kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['nohp','No Telephone tidak boleh kosong']})
                  this.nohp.focus();
              }else if(this.state.kebutuhan === ""){
                toast.warn('Kebutuhan tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['kebutuhan','kebutuhan tidak boleh kosong']})
              }else if(this.state.alamat === ""){
                toast.warn('Alamat tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  this.setState({focus:['alamat','alamat tidak boleh kosong']})
                  this.alamat.focus();
              }else{
                let tdy = new Date();
                var htg = {
                  nik:this.state.nik,
                  nama:this.state.nama,
                  no_telp:this.state.no_telp,
                  pekerjaan:(this.state.pk === "" ? this.state.pekerjaan : this.state.pk),
                  tempat_lahir:this.state.tempat_lahir,
                  tgl_lahir: this.state.tgl_lahir,
                  alamat: this.state.alamat,
                  email:this.state.email,
                  kebutuhan:this.state.kebutuhan,
                  status:"Pending",
                  idpenerima:this.state.id_penerima,
                  tgl_pengajuan: tdy.getDate()+"-"+(tdy.getMonth()+1)+"-"+tdy.getFullYear(),
                  ordertime: timeRef
                };
                const notif = {
                  nik_penerima: this.state.id_penerima,
                  nama_pengirim : this.state.nama,
                  nik_pengirim: this.state.nik,
                  teks: this.state.nama+ " Membuat pengajuan "+ htg.kebutuhan +" pada tanggal ("+ htg.tgl_pengajuan +")" ,
                  tipe: "biru",
                  time_notif: timeRef
                };
                if(this.state.formVisible === 2){
                  this.setState({formVisible:3})
                  rootRef.child('Notifikasi').push(notif);
                rootRef.child('Pengajuan').push(htg);
                this.setState({ nama:'', no_telp:'', pekerjaan:'', status:'', tempat_lahir:'', tgl_lahir:'', email:'', alamat:'', kebutuhan:''});
                toast.success('Pengajuan Berhasil Di Simpan', {
                  position: toast.POSITION.TOP_RIGHT,
                });

                
                RefPengurus.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap =>{
                  snap.forEach(shot => {
                    if(shot.val().jabatan === "Sekretaris"){
                      let Base = 'http://webbeta.wargaku.id/apps/send_mailsekr?emailsekr='+shot.val().email+"&nama="+this.state.nama+"&kebutuhan="+this.state.kebutuhan;
                      console.log("email sekretaris "+shot.val().email)
                        return new Promise((resolve, reject) =>{
                          fetch(Base, {
                            method: 'GET',
                          })
                          /*.then((response) => response.json())*/
                          .then((res) => {
                            resolve(res);
                          })
                          .catch((error) => {
                            reject(error);
                          });
                          });
                    }
                  })
  
                })
                let BaseURL = 'http://webbeta.wargaku.id/apps/send_mail?nosekr='+this.state.nosekr+"&emailrt="+this.state.emailrt+"&nama="+this.state.nama+"&kebutuhan="+this.state.kebutuhan;
                return new Promise((resolve, reject) =>{
                  fetch(BaseURL, {
                    method: 'GET',
                  })
                  /*.then((response) => response.json())*/
                  .then((res) => {
                    resolve(res);
                  })
                  .catch((error) => {
                    reject(error);
                  });
                  });
                  
                }else{
                  this.setState({formVisible:2});

                }
                

              }
              
  };
  render() {
    let form='';
    const {tasksek, displayForm} = this.state;
    const orderedTasks = orderBy(
      tasksek
    );
    let pk = '';
    if(displayForm){
      pk = (
        <div className="col-md-12">
            <div className="form-group col-md-12">
              <input type="text" value={this.state.pk} name="pk" className="form-control" id="nama" placeholder="Masukkan Pekerjaan Anda" onChange={this.onChange} required/>
            </div>
        </div>
      )
    }
    if(this.state.formVisible === 1){
      form = (
        <div>
          <h3 className="text-center" style={{color: '#000'}}>Pengajuan</h3>
        <form onSubmit={this.notify} className='top-50'>
          <div className="row">
            <div className="form-group col-md-6">
              <label for="exampleFormControlInput1" style={{color: '#000'}}>Nik</label>
              <input type="text" ref={(input) => { this.nik = input; }} value={this.state.nik} name="nik" className="form-control" id="nama" placeholder="Masukkan Nik Anda" onChange={this.onChange} required />
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "nik" ? "block" : "")}}>
                {(this.state.focus[0] === "nik" ? this.state.focus[1] : "")}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label for="exampleFormControlInput1" style={{color: '#000'}}>Nama</label>
              <input type="text" ref={(input) => { this.nama = input; }} value={this.state.nama} name="nama" className="form-control" id="nama" placeholder="Masukkan Nama Anda" onChange={this.onChange} required/>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "nama" ? "block" : "")}}>
                {(this.state.focus[0] === "nama" ? this.state.focus[1] : "")}
              </div>
            </div>

            <div className="form-group col-md-6">
              <label for="exampleFormControlInput1" style={{color: '#000'}}>Tempat Lahir</label>
              <input type="text" ref={(input) => { this.tempat_lahir = input; }} value={this.state.tempat_lahir} className="form-control" name="tempat_lahir" id="tempat" placeholder="Masukkan Tempat Lahir" onChange={this.onChange}/>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "tempat_lahir" ? "block" : "")}}>
                  {(this.state.focus[0] === "tempat_lahir" ? this.state.focus[1] : "")}
                </div>
            </div>
            <div className="form-group col-md-6">
              <label for="exampleFormControlInput1" style={{color: '#000'}}>Tanggal Lahir</label>
              <input type="date" ref={(input) => { this.tgl_lahir = input; }} value={this.state.tgl_lahir}  name="tgl_lahir" className="form-control datepicker-here" id="tanggal" onChange={this.onChange}/>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "tgl_lahir" ? "block" : "")}}>
                  {(this.state.focus[0] === "tgl_lahir" ? this.state.focus[1] : "")}
                </div>

            </div>
            <div className="form-group col-md-12">
              <label for="exampleFormControlSelect1" style={{color: '#000'}}>Pekerjaan</label>
              <select value={this.state.pekerjaan} ref={(input) => { this.pekerjaan = input; }} className="form-control" id="exampleFormControlSelect1" name="pekerjaan" onChange={this.onChange}>
                <option value="">Pilih Pekerjaan</option>
                <option value="BELUM/TIDAK BEKERJA">BELUM/TIDAK BEKERJA</option>
                <option value="MENGURUS RUMAH TANGGA">MENGURUS RUMAH TANGGA</option>
                <option value="PELAJAR/MAHASISWA">PELAJAR/MAHASISWA</option>
                <option value="PENSIUNAN">PENSIUNAN</option>
                <option value="DOKTER">DOKTER</option>
                <option value="TENTARA NASIONAL INDONESIA">TENTARA NASIONAL INDONESIA</option>
                <option value="WIRASWASTA">WIRASWASTA</option>
                <option value="PEGAWAI NEGERI SIPIL">PEGAWAI NEGERI SIPIL</option>
                <option value="Lain Lain">Lain Lain</option>
              </select>
            </div>
            {pk}
            <div class="invalid-feedback"  style={{display:(this.state.focus[0] === "pekerjaan" ? "block" : "")}}>
                  {(this.state.focus[0] === "pekerjaan" ? this.state.focus[1] : "")}
                </div>
            <div className="form-group col-md-6">
              <label for="exampleFormControlInput1"  style={{color: '#000'}}>Email</label>
              <input type="email" value={this.state.email} ref={(input) => { this.email = input; }}  className="form-control" name="email" id="exampleFormControlInput1" placeholder="Masukkan Email" onChange={this.onChange}/>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "email" ? "block" : "")}}>
                  {(this.state.focus[0] === "email" ? this.state.focus[1] : "")}
                </div>
            </div>
            <div className="form-group col-md-6">
              <label for="exampleFormControlInput1" style={{color: '#000'}}>No HP</label>
              <input  type="number" value={this.state.no_telp} ref={(input) => { this.nohp = input; }} className="form-control" name="no_telp" id="exampleFormControlInput1" placeholder="Masukkan No HP" onChange={this.onChange}/>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "nohp" ? "block" : "")}}>
                  {(this.state.focus[0] === "nohp" ? this.state.focus[1] : "")}
                </div>
            </div>
            <div className="form-group col-md-12">
              <label for="exampleFormControlInput1" style={{color: '#000'}}>Kebutuhan</label>
              <input type="text" value={this.state.kebutuhan} ref={(input) => { this.kebutuhan = input; }} className="form-control" name="kebutuhan" id="kebutuhan" placeholder="Masukkan Kebutuhan" onChange={this.onChange}/>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "kebutuhan" ? "block" : "")}}>
                  {(this.state.focus[0] === "kebutuhan" ? this.state.focus[1] : "")}
                </div>
            </div>
            <div className="form-group col-md-12">
              <label for="exampleFormControlTextarea1" style={{color: '#000'}}>Alamat</label>
              <textarea className="form-control" rows="6" ref={(input) => { this.alamat = input; }} name="alamat" id="exampleFormControlTextarea1" placeholder="Masukkan Alamat" onChange={this.onChange} value={this.state.alamat}></textarea>
              <div class="invalid-feedback" style={{display:(this.state.focus[0] === "alamat" ? "block" : "")}}>
                  {(this.state.focus[0] === "alamat" ? this.state.focus[1] : "")}
                </div>
            </div>
            <div className="form-group col-md-12 text-center">
            <button type="submit" onClick={this.notify} className="btn btn-banner col-md-3">Kirim</button>
            {/* <button type="submit" onClick={this.notify} className="btn btn-banner col-md-3">Preview</button> */}
          </div>
          </div>
        </form>
        </div>
      )
    }else if(this.state.formVisible === 2){
      form = <div style={{overflow:"hidden"}}>
               <div class="col-12 padding-header">
                <h4 class="text-upper text-center no-padding">
                  RUKUN TETANGGA 0{localStorage.getItem("nort")} RUKUN WARGA 06 <br/> KELURAHAN TUNGGULWULUNG <br/> KECAMATAN LOWOKWARU KOTA MALANG
                </h4>
              </div>
              <div style={{clear: "both"}}></div>
              <div class="border-bold"></div>
              <div class="container" >
                <div class="text-upper text-center">
                  <h3 class="text-underline ">surat pengantar</h3>
                  <h5 class="normal">Nomor : .../KET/RT.-VI/.../</h5>
                </div>
                <p>Yang Bertanda Tangan di bawah ini Ketua RT 0{localStorage.getItem("nort")}/RW 06 Kelurahan Tunggulwulung </p>
                <p>Kecamatan Lowokwaru Kota Malang, Menerangkan dengan sebenarnya bahwa:</p>
                <table width="100%">
                  <tr>
                    <td>	</td><td>Nama Lengkap</td><td>:</td><td class="capitalize">{this.state.nama}</td>
                  </tr>
                  <tr>
                    <td>	</td><td>Tempat, Tgl.Lahir</td><td>:</td><td class="capitalize">{this.state.tempat_lahir}, {this.state.tgl_lahir}</td>
                  </tr>
                  <tr>
                    <td>	</td><td>Pekerjaan</td><td>:</td><td class="capitalize">{(this.state.pekerjaan !== "" ? this.state.pekerjaan : this.state.pk)}</td>
                  </tr>
                  <tr>
                    <td>	</td><td>Alamat Lengkap</td><td>:</td><td class="uppercase">{this.state.alamat}</td>
                  </tr>
                </table><br/>
                <p>Orang tersebut diatas adalah benar-benar warga kami</p>
                <p>Surat keterangan ini digunakan untuk {this.state.kebutuhan}</p>
                <p>Persyaratan yang harus dibawa : KTP, KK, Tanda Lunas PBB</p>
                <p>Demikian surat Keterangan/Pengantar ini agar dapat digunakan sebagai mestinya.</p><br/>
                <h5 class="normal">No: ....../RW.06-PERMATAJINGGA/</h5>
                <div style={{marginTop:100+"px"}}></div>
                <div style={{float: "left",textAlign:"center", width: 40+"%",marginLeft: 6+"%"}} >
                  Mengetahui,<br/>
                  Ketua RW. VI Kel. Tunggulwulung
                  <br/><br/><br/><br/>
                  <b>{localStorage.getItem("namarw")}</b>
                </div>

                <div style={{float: "right",textAlign:"center", width: 40+"%",marginRight: 6+"%"}} >
                  Malang, <br/>
                  Ketua RT 0-RW VI
                  <br/><br/><br/><br/>
                  <b>{localStorage.getItem("namart")}</b>
                </div>
              </div>
              
              <div>
              <div style={{marginTop:50+"px"}}></div>
              <button type="submit" onClick={(e) => this.setState({formVisible:1})} className="btn btn-banner col-md-3" style={{float:"right",marginTop:50+"px"}}>Edit Pengajuan</button>
              <button type="submit" onClick={this.notify} className="btn btn-banner col-md-3" style={{marginTop:50+"px"}}>Lanjut</button>
              </div>
          </div>
    }else{
      form = (
        <div>
          <h3 className='text-warning'>Terima kasih</h3>
          <p>pengajuan surat telah terkirim. Mohon menunggu informasi dari Ketua RT/Sekretaris untuk pengambilan surat. Jika dalam waktu 2x24 jam tidak ada info silhakan hubungi Nomor dibawah ini:</p>
          <p>Ketua RT : <a href={'tel:'+this.state.nort}>{this.state.nort}</a> ({this.state.namart})</p>
          {orderedTasks.map(task => (
            <p>Sekretaris : <a href={'tel:'+task.nohp}>{task.nohp}</a> ({task.nama})</p>
          ))}
          <button className='btn btn-warning' onClick={(e) => this.setState({formVisible:1})}>Kembali Ke Pengajuan</button>
        </div>
      )
    }
    return (
     <div className='home' >
		 <Header/>
		 <div className="container top-10  form-login">
        <div>
        {form}
        </div>
    </div>
    <ToastContainer
      hideProgressBar={false}
      newestOnTop={true}
      autoClose={2000}
  />
		<Footer/>
     </div>
    );
  }
}

export default PengurusRT;
