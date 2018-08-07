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

        <a href="/Sekretaris/Home" className="brand-link">
          {/* <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/W-thumb.jpg?alt=media&token=fed15c7e-25de-43e9-84b5-a5d5643f84ed" className="brand-image img-circle elevation-3"
               /> */}
          <span className="brand-text font-weight-light">Permata Jingga</span>
        </a>


        <div className="sidebar">

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/avatar5.png?alt=media&token=ef4fc2d5-48b1-4dd5-af88-08c69cc20b2e" className="img-circle elevation-2" alt="User Image"/>
            </div>
            <div className="info">
              <a href="" className="d-block">{localStorage.getItem("nama")}</a>
            </div>
          </div>


          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


              <li className="nav-item">
                <a href="/Sekretaris/Home" className={"nav-link "+(this.state.link === "//Sekretaris/Home" ? "active" : "")}>
                  <i className="nav-icon fa fa-dashboard"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="/Sekretaris/Pengajuan" className={"nav-link "+(this.state.link === "//Sekretaris/Pengajuan" ? "active" : "")}>
                  <i className="nav-icon fa fa-table"></i>
                  <p>
                   Data Pengajuan
                    {/*<i className="fa fa-angle-left right"></i>*/}
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/Sekretaris/Profil" className={"nav-link "+(this.state.link === "//Sekretaris/Profil" ? "active" : "")}>
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
