import React, { Component } from "react";

class Layout extends Component {
  state = {
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
    this.setState({link:newPathname});
  }
  render() {
    return (

        <aside className="main-sidebar sidebar-light-primary elevation-4">

        <a href="/RW/Home" className="brand-link">
          <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/W-thumb.jpg?alt=media&token=fed15c7e-25de-43e9-84b5-a5d5643f84ed" alt="Logo" className="brand-image img-circle elevation-3"
               />
          <span className="brand-text font-weight-light">WargaKu</span>
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
                <a href="/RW/Home" className={"nav-link "+(this.state.link === "//RW/Home" ? "active" : "")}>
                  <i className="nav-icon fa fa-dashboard"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RW/WargaTambahan" ? "active menu-open" : "" || this.state.link === "//RW/DataWarga" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RW/WargaTambahan" ? "active " : "" || this.state.link === "//RW/DataWarga" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Data Warga
                  </p>
                    <i className="fa fa-angle-left right"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <a href="/RW/DataWarga" className={"nav-link "+(this.state.link === "//RW/DataWarga" ? "active" : "")}>
                          <i className="fa fa-users nav-icon"></i>
                          <p>Semua Warga</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/RW/WargaTambahan" className={"nav-link "+(this.state.link === "//RW/WargaTambahan" ? "active" : "")}>
                          <i className="fa fa-users nav-icon"></i>
                          <p>Warga Tambahan</p>
                        </a>
                  </li>
                </ul>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RW/DataKK" ? "active menu-open" : "" || this.state.link === "//RW/AddKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RW/DataKK" ? "active " : "" || this.state.link === "//RW/AddKK" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Data KK
                  </p>
                    <i className="fa fa-angle-left right"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/RW/DataKK" className={"nav-link "+(this.state.link === "//RW/DataKK" ? "active" : "")}>
                      <i className="fa fa-list nav-icon"></i>
                      <p>Daftar KK</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/RW/AddKK" className={"nav-link "+(this.state.link === "//RW/AddKK" ? "active" : "")}>
                      <i className="fa fa-plus nav-icon"></i>
                      <p>Tambah KK</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RW/DataRT" className={"nav-link "+(this.state.link === "//RW/DataRT" ? "active" : "")}>
                  <i className="nav-icon fa fa-user"></i>
                  <p>
                    Data RT
                  </p>
                </a>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RW/ImportWargaAsli" ? "active menu-open" : "" || this.state.link === "//RW/ImportWargaTambahan" ? "active menu-open" : "" || this.state.link === "//RW/ImportKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RW/ImportWargaAsli" ? "active " : "" || this.state.link === "//RW/ImportWargaTambahan" ? "active" : "" || this.state.link === "//RW/ImportKK" ? "active" : "")}>
                  <i className="nav-icon fa fa-upload"></i>
                  <p>
                   Import Data
                  </p>
                    <i className="fa fa-angle-left right"></i>
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/RW/ImportWargaAsli" className={"nav-link "+(this.state.link === "//RW/ImportWargaAsli" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Warga Asli</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/RW/ImportWargaTambahan" className={"nav-link "+(this.state.link === "//RW/ImportWargaTambahan" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Warga Tambahan</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/RW/ImportKK" className={"nav-link "+(this.state.link === "//RW/ImportKK" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Data KK</p>
                        </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/RW/Pengajuan" className={"nav-link "+(this.state.link === "//RW/Pengajuan" ? "active" : "")}>
                  <i className="nav-icon fa fa-files-o"></i>
                  <p>
                    Data Pengajuan
                  </p>
                </a>
              </li>
              
              
              <li className="nav-item">
                <a href="/RW/Pengumuman" className="nav-link">
                  <i className="nav-icon fa fa-bullhorn"></i>
                  <p>
                    Pengumuman
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/RW/DaftarAgenda" className={"nav-link "+(this.state.link === "//RW/DaftarAgenda" ? "active" : "")}>
                  <i className="nav-icon fa fa-newspaper-o"></i>
                  <p>
                    Agenda
                  </p>
                </a>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//RW/DataSurat" ? "active menu-open" : "" || this.state.link === "//RW/Profil" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//RW/DataSurat" ? "active " : "" || this.state.link === "//RW/Profil" ? "active" : "")}>
                  <i className="nav-icon fa fa-gear"></i>
                  <p>
                   Pengaturan
                  </p>
                    <i className="fa fa-angle-left right"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/RW/DataSurat" className={"nav-link "+(this.state.link === "//RW/DataSurat" ? "active" : "")}>
                      <i className="nav-icon fa fa-envelope"></i>
                      <p>
                        Pengaturan Surat
                      </p>
                    </a>
                  </li>
                    <li className="nav-item">
                    <a href="/RW/Profil" className={"nav-link "+(this.state.link === "//RW/Profil" ? "active" : "")}>
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
