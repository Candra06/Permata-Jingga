import React, { Component } from "react";
import { RefPengajuan, rootRef } from './../../../db';
class Layout extends Component {
  state = {
    countPending:'',
    countProses:'',
    link:''
  }
  componentWillMount(){
    RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      var countPending=0;
      var countProses=0;
      snap.forEach(shot => {
        if(shot.val().status === "Pending"){
          ++countPending;
        }else if(shot.val().status === "Proses"){
          ++countProses;
        }
      });
      var pathArray = window.location.pathname.split( '/' );
      var secondLevelLocation = pathArray[0];
      var newPathname = "";
      for (var i = 0; i < pathArray.length; i++) {
        newPathname += "/";
        newPathname += pathArray[i];
      }
      this.setState({link:newPathname});
      console.log(newPathname);
      this.setState({ countPending:countPending });
      this.setState({ countProses:countProses });
    });
  }
  render() {
    return (

        <aside className="main-sidebar sidebar-light-info elevation-4">

        <a href="/RT/Home" className="brand-link">
          {/* <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/W-thumb.jpg?alt=media&token=fed15c7e-25de-43e9-84b5-a5d5643f84ed" className="brand-image img-circle elevation-3"
               /> */}
          <span className="brand-text font-weight-light">Permata Jingga</span>
        </a>


        <div className="sidebar">

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={localStorage.getItem("foto")} className="img-circle elevation-2" alt="User Image"/>
            </div>
            <div className="info">
              <a href="" className="d-block">{localStorage.getItem("nama")}</a>
            </div>
          </div>


          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


              <li className="nav-item">
                <a href="/RT/Home" className={"nav-link "+(this.state.link === "//RT/Home" ? "active" : "")}>
                  <i className="nav-icon fa fa-dashboard"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RT/Pengajuan" className={"nav-link "+(this.state.link === "//RT/Pengajuan" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                   Data Pengajuan
                    {/*<i className="fa fa-angle-left right"></i>*/}
                    {/* &nbsp;<span className=" badge badge-info">{this.state.countPending}</span>&nbsp;
                    <span className=" badge badge-warning">{this.state.countProses}</span> */}
                  </p>
                </a>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RT/KK" ? "active menu-open" : "" || this.state.link === "//RT/AddKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RT/KK" ? "active " : "" || this.state.link === "//RT/AddKK" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Data KK
                    <i className="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/RT/KK" className={"nav-link "+(this.state.link === "//RT/KK" ? "active" : "")}>
                      <i className="fa fa-circle-o nav-icon"></i>
                      <p>Data KK</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/RT/AddKK" className={"nav-link "+(this.state.link === "//RT/AddKK" ? "active" : "")}>
                      <i className="fa fa-plus nav-icon"></i>
                      <p>Tambah KK</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RT/WargaTambahan" ? "active menu-open" : "" || this.state.link === "//RT/DataWarga" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RT/WargaTambahan" ? "active " : "" || this.state.link === "//RT/DataWarga" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Data Warga
                    <i className="fa fa-angle-left right"></i>
                  </p>
                    
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <a href="/RT/DataWarga" className={"nav-link "+(this.state.link === "//RT/DataWarga" ? "active" : "")}>
                          <i className="fa fa-users nav-icon"></i>
                          <p>Semua Warga</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/RT/WargaTambahan" className={"nav-link "+(this.state.link === "//RT/WargaTambahan" ? "active" : "")}>
                          <i className="fa fa-users nav-icon"></i>
                          <p>Warga Tambahan</p>
                        </a>
                  </li>
                </ul>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RT/ImportWargaAsli" ? "active menu-open" : "" || this.state.link === "//RT/ImportWargaTambahan" ? "active menu-open" : "" || this.state.link === "//RT/ImportKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RT/ImportWargaAsli" ? "active " : "" || this.state.link === "//RT/ImportWargaTambahan" ? "active" : "" || this.state.link === "//RT/ImportKK" ? "active" : "")}>
                  <i className="nav-icon fa fa-upload"></i>
                  <p>
                   Import Data
                   <i className="fa fa-angle-left right"></i>
                  </p>
                    
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/RT/ImportWargaAsli" className={"nav-link "+(this.state.link === "//RT/ImportWargaAsli" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Warga Asli</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/RT/ImportWargaTambahan" className={"nav-link "+(this.state.link === "//RT/ImportWargaTambahan" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Warga Tambahan</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/RT/ImportKK" className={"nav-link "+(this.state.link === "//RT/ImportKK" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Data KK</p>
                        </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RT/Agenda" className={"nav-link "+(this.state.link === "//RT/Agenda" ? "active" : "")}>
                  <i className="nav-icon fa fa-newspaper-o"></i>
                  <p>
                    Agenda
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RT/ProgramKerja" className={"nav-link "+(this.state.link === "//RT/ProgramKerja" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                   Program Kerja
                    {/*<i className="fa fa-angle-left right"></i>*/}
                    {/* &nbsp;<span className=" badge badge-info">{this.state.countPending}</span>&nbsp;
                    <span className=" badge badge-warning">{this.state.countProses}</span> */}
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RT/Pengurus" className={"nav-link "+(this.state.link === "//RT/Pengurus" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                   Pengurus RT
                    {/*<i className="fa fa-angle-left right"></i>*/}
                    {/* &nbsp;<span className=" badge badge-info">{this.state.countPending}</span>&nbsp;
                    <span className=" badge badge-warning">{this.state.countProses}</span> */}
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RT/Qurban" className={"nav-link "+(this.state.link === "//RT/Qurban" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                   Data Qurban
                    {/*<i className="fa fa-angle-left right"></i>*/}
                    {/* &nbsp;<span className=" badge badge-info">{this.state.countPending}</span>&nbsp;
                    <span className=" badge badge-warning">{this.state.countProses}</span> */}
                  </p>
                </a>
              </li>
              
              <li className={"nav-item has-treeview "+(this.state.link === "//RT/Pengumuman" ? "active menu-open" : "" || this.state.link === "//RT/AddKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RT/Pengumuman" ? "active " : "" || this.state.link === "//RT/Pesan" ? "active" : "")}>
                  <i className="nav-icon fa fa-comments"></i>
                  <p>
                    Pesan
                    <i className="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/RT/Pengumuman" className={"nav-link "+(this.state.link === "//RT/Pengumuman" ? "active" : "")}>
                      <i className="nav-icon fa fa-bullhorn"></i>
                      <p>Pengumuman</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/RT/Pesan" className={"nav-link "+(this.state.link === "//RT/Pesan" ? "active" : "")}>
                      <i className="nav-icon fa fa-comments"></i>
                      <p>Kirim Pesan</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RT/Galeri" className={"nav-link "+(this.state.link === "//RT/Galeri" ? "active" : "")}>
                  <i className="nav-icon fa fa-camera-retro"></i>
                  <p>
                   Galeri
                    {/*<i className="fa fa-angle-left right"></i>*/}
                    {/* &nbsp;<span className=" badge badge-info">{this.state.countPending}</span>&nbsp;
                    <span className=" badge badge-warning">{this.state.countProses}</span> */}
                  </p>
                </a>
              </li>
              
              <li className={"nav-item has-treeview "+(this.state.link === "//RT/Surat" ? "active menu-open" : "" || this.state.link === "//RT/Profil" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RT/Surat" ? "active " : "" || this.state.link === "//RT/Profil" ? "active" : "")}>
                  <i className="nav-icon fa fa-gear"></i>
                  <p>
                   Pengaturan
                   <i className="fa fa-angle-left right"></i>
                  </p>
                    
                </a>
                <ul className="nav nav-treeview">
                 
                  <li className="nav-item">
                    <a href="/RT/Deskripsi" className={"nav-link "+(this.state.link === "//RT/Deskripsi" ? "active" : "")}>
                      <i className="nav-icon fa fa-envelope"></i>
                      <p>
                        Deskripsi RT
                      </p>
                    </a>
                  </li>
                    <li className="nav-item">
                    <a href="/RT/Profil" className={"nav-link "+(this.state.link === "//RT/Profil" ? "active" : "")}>
                      <i className="nav-icon fa fa-user"></i>
                      <p>
                        Pengaturan Akun
                      </p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/Logout" className="nav-link">
                  <i className="nav-icon fa fa-sign-out"></i>
                  <p>
                    Keluar
                  </p>
                </a>
              </li>
              
            </ul>
          </nav>

        </div>

      </aside>
    );
  }
}

export default Layout;
