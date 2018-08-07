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

        <aside className="main-sidebar sidebar-dark-primary elevation-4">

        <a href="/Warga/Home" className="brand-link">
          <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/W-thumb.jpg?alt=media&token=fed15c7e-25de-43e9-84b5-a5d5643f84ed" className="brand-image img-circle elevation-3"
               />
          <span className="brand-text font-weight-light">WargaKu</span>
        </a>


        <div className="sidebar">

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/avatar5.png?alt=media&token=ef4fc2d5-48b1-4dd5-af88-08c69cc20b2e" className="img-circle elevation-2"/>
            </div>
            <div className="info">
              <a href="/Warga/Profil" className="d-block">{localStorage.getItem("nama")}</a>
            </div>
          </div>


          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


            <li className="nav-item">
                <a href="/Warga/Home" className={"nav-link "+(this.state.link === "//Warga/Home" ? "active" : "")}>
                  <i className="nav-icon fa fa-dashboard"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Warga/Pengajuan" className={"nav-link "+(this.state.link === "//Warga/Pengajuan" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                    Data Pengajuan
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Warga/Agenda" className={"nav-link "+(this.state.link === "//Warga/Agenda" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                    Agenda
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Warga/Penitipan" className={"nav-link "+(this.state.link === "//Warga/Penitipan" ? "active" : "")}>
                  <i className="nav-icon fa fa-home"></i>
                  <p>
                    Penitipan Rumah
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Warga/Laporan" className={"nav-link "+(this.state.link === "//Warga/Laporan" ? "active" : "")}>
                  <i className="nav-icon fa fa-pencil"></i>
                  <p>
                    Laporan Satpam
                  </p>
                </a>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//Warga/PengumumanPribadi" ? "active menu-open" : "" || this.state.link === "//Warga/PengumumanUmum" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//Warga/PengumumanUmum" ? "active " : "" || this.state.link === "//Warga/PengumumanPribadi" ? "active" : "")}>
                  <i className="nav-icon fa fa-bullhorn"></i>
                  <p>
                  Pengumuman
                    <i className="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul className='nav nav-treeview'>
                  <li className="nav-item">
                    <a href="/Warga/PengumumanPribadi" className={"nav-link "+(this.state.link === "//Warga/PengumumanPribadi" ? "active" : "")}>
                      <i className="fa fa-circle-o nav-icon"></i>
                      <p>Pengumuman Pribadi</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Warga/PengumumanUmum" className={"nav-link "+(this.state.link === "//Warga/PengumumanUmum" ? "active" : "")}>
                      <i className="fa fa-circle-o nav-icon"></i>
                      <p>Pengumuman Umum</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/Warga/KeluargaSaya" className={"nav-link "+(this.state.link === "//Warga/KeluargaSaya" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Keluarga Saya
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Warga/Profil" className={"nav-link "+(this.state.link === "//Warga/Profil" ? "active" : "")}>
                  <i className="nav-icon fa fa-user"></i>
                  <p>
                    Pengaturan Akun
                  </p>
                </a>
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
