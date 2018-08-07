import React, { Component } from "react";

class Layout extends Component {
  state = {
    link:''
  }
  componentWillMount(){
    var pathArray = window.location.pathname.split( '/' );
    //var secondLevelLocation = pathArray[0];
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

        <a href="/Admin/Home" className="brand-link">
          <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/W-thumb.jpg?alt=media&token=fed15c7e-25de-43e9-84b5-a5d5643f84ed" className="brand-image img-circle elevation-3"
               />
          <span className="brand-text font-weight-light">WargaKu</span>
        </a>


        <div className="sidebar">

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/avatar5.png?alt=media&token=ef4fc2d5-48b1-4dd5-af88-08c69cc20b2e" className="img-circle elevation-2" alt="User Image"/>
            </div>
            <div className="info">
              <a href="" className="d-block">{localStorage.getItem("nik")}</a>
            </div>
          </div>


          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


              <li className="nav-item">
                <a href="/Admin/Home" className={"nav-link "+(this.state.link === "//Admin/Home" ? "active" : "")}>
                  <i className="nav-icon fa fa-dashboard"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
              </li> <li className={"nav-item has-treeview "+(this.state.link === "//Admin/WargaTambahan" ? "active menu-open" : "" || this.state.link === "//Admin/DataWarga" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//Admin/WargaTambahan" ? "active " : "" || this.state.link === "//Admin/DataWarga" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Data Warga
                  </p>
                    <i className="fa fa-angle-left float-right"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <a href="/Admin/DataWarga" className={"nav-link "+(this.state.link === "//Admin/DataWarga" ? "active" : "")}>
                          <i className="fa fa-users nav-icon"></i>
                          <p>Semua Warga</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/Admin/WargaTambahan" className={"nav-link "+(this.state.link === "//Admin/WargaTambahan" ? "active" : "")}>
                          <i className="fa fa-users nav-icon"></i>
                          <p>Warga Tambahan</p>
                        </a>
                  </li>
                </ul>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//Admin/KK" ? "active menu-open" : "" || this.state.link === "//Admin/AddKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//Admin/KK" ? "active " : "" || this.state.link === "//Admin/AddKK" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Data KK
                  </p>
                    <i className="fa fa-angle-left float-right"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/Admin/KK" className={"nav-link "+(this.state.link === "//Admin/KK" ? "active" : "")}>
                      <i className="fa fa-list nav-icon"></i>
                      <p>Daftar KK</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Admin/AddKK" className={"nav-link "+(this.state.link === "//Admin/AddKK" ? "active" : "")}>
                      <i className="fa fa-plus nav-icon"></i>
                      <p>Tambah KK</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Admin/PengaturanKK" className={"nav-link "+(this.state.link === "//Admin/PengaturanKK" ? "active" : "")}>
                      <i className="nav-icon fa fa-gears"></i>
                      <p>
                        Pengaturan Data KK
                      </p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="/Admin/RT" className={"nav-link "+(this.state.link === "//Admin/RT" ? "active" : "")}>
                  <i className="nav-icon fa fa-user"></i>
                  <p>
                   Data RT
                    {/*<i className="fa fa-angle-left right"></i>*/}
                  </p>
                </a>
              </li>
              {/* <li className="nav-item has-treeview">
                <a href="/Admin/RW" className={"nav-link "+(this.state.link === "//Admin/RW" ? "active" : "")}>
                  <i className="nav-icon fa fa-user"></i>
                  <p>
                    Data RW
                  </p>
                </a>
              </li> */}
              
              <li className={"nav-item has-treeview "+(this.state.link === "//Admin/ImportWargaAsli" ? "active menu-open" : "" || this.state.link === "//Admin/ImportWargaTambahan" ? "active menu-open" : "" || this.state.link === "//Admin/ImportKK" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//Admin/ImportWargaAsli" ? "active " : "" || this.state.link === "//Admin/ImportWargaTambahan" ? "active" : "" || this.state.link === "//Admin/ImportKK" ? "active" : "")}>
                  <i className="nav-icon fa fa-upload"></i>
                  <p>
                   Import Data
                  </p>
                    <i className="fa fa-angle-left float-right"></i>
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/Admin/ImportWargaAsli" className={"nav-link "+(this.state.link === "//Admin/ImportWargaAsli" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Warga Asli</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/Admin/ImportWargaTambahan" className={"nav-link "+(this.state.link === "//Admin/ImportWargaTambahan" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Warga Tambahan</p>
                        </a>
                  </li>
                <li className="nav-item">
                  <a href="/Admin/ImportKK" className={"nav-link "+(this.state.link === "//Admin/ImportKK" ? "active" : "")}>
                          <i className="fa fa-upload nav-icon"></i>
                          <p>Data KK</p>
                        </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/Admin/Pengumuman" className={"nav-link "+(this.state.link === "//Admin/Pengumuman" ? "active" : "")}>
                  <i className="nav-icon fa fa-th"></i>
                  <p>
                    Pengumuman
                  </p>
                </a>
              </li>
              <li className={"nav-item has-treeview "+(this.state.link === "//Admin/AkunAdmin" ? "active menu-open" : "" || this.state.link === "//Admin/AkunWarga" ? "active menu-open" : "")}>
                <a href="" className={"nav-link "+(this.state.link === "//Admin/AkunWarga" ? "active " : "" || this.state.link === "//Admin/AkunAdmin" ? "active" : "")}>
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Akun
                  </p>
                <i className="fa fa-angle-left float-right"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/Admin/AkunWarga" className={"nav-link "+(this.state.link === "//Admin/AkunWarga" ? "active" : "")}>
                      <i className="fa fa-list nav-icon"></i>
                      <p>Akun Warga, RT & RW</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Admin/AkunAdmin" className={"nav-link "+(this.state.link === "//Admin/AkunAdmin" ? "active" : "")}>
                      <i className="fa fa-lock nav-icon"></i>
                      <p>Akun Admin</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
              <a href="/Admin/Kelurahan" className={"nav-link "+(this.state.link === "//Admin/Kelurahan" ? "active" : "")}>
                      <i className="fa fa-building nav-icon"></i>
                      <p>Data Kelurahan</p>
                    </a>
              </li>
              <li className="nav-item has-treeview">
              <a href="/Admin/Blog" className={"nav-link "+(this.state.link === "//Admin/Blog" ? "active" : "")}>
                      <i className="fa fa-edit nav-icon"></i>
                      <p>Blog</p>
                    </a>
              </li>
              <li className="nav-item">
                <a href="/Admin/Profil" className={"nav-link "+(this.state.link === "//Admin/Profil" ? "active" : "")}>
                  <i className="nav-icon fa fa-gear"></i>
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
