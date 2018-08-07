import React, { Component } from 'react';
// service
import { Action } from "../../../Action";
import {Redirect} from 'react-router-dom';
import orderBy from 'lodash/orderBy';
// import pages
// import Footer from "../partials/footer.js";
import { RefUser, RefWarga } from './../../../db';
// import Header from "../partials/header.js";
import GoogleLogin from 'react-google-login';
import logobaru from "./../../../asset/img/logobaru.png"
import Header from "./../partials/header"
class Signin extends Component {
	constructor(props){
		super(props);
		this.state = {
			nik : '',
			password : '',
      redirect:false,
			redirectLink:false,
      loginError: false,
      msg:['','']
		}
    this.login = this.login.bind(this);

this.signup = this.signup.bind(this);
		this.onChange = this.onChange.bind(this);
	}
  componentWillMount(){
    if(localStorage.getItem('level') === null){
      this.setState({redirectLink:false});
    }else if(localStorage.getItem("level") === "RT"){
        this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "Admin"){
      this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "Warga"){
      this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "RW"){
      this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "Satpam"){
      this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "Sekretaris"){
      this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "Bendahara"){
      this.setState({redirectLink:true});
    }else if(localStorage.getItem("level") === "Panitia"){
      this.setState({redirectLink:true});
    }
  }
  signup(res, type) {
    let postData;
        postData = {
          name: res.w3.ig,
          provider: type,
          email: res.w3.U3,
          provider_id: res.El,
          token: res.Zi.access_token,
          provider_pic: res.w3.Paa
        };



        RefUser.orderByChild("email").equalTo(postData.email).on('value', snap => {
          const tasks2 = [];
          snap.forEach(shot => {
						RefWarga.orderByChild("email").equalTo(shot.val().email).on("value", snap => {
							snap.forEach(shott => {
								localStorage.setItem("foto", shott.val().urlfoto)
							})
						})
            tasks2.push({ ...shot.val(), key: shot.key });
                //localStorage.setItem("", shot.val());
                localStorage.setItem("nama", shot.val().email);
                localStorage.setItem("nik", shot.val().nik);
				        localStorage.setItem("level", shot.val().level);
                localStorage.setItem("kodeuser", shot.val().kd_user);

            this.setState({msg:["success", "Login Berhasil"]})
            if(shot.val().level === "Warga"){
              // this.setState({link:"/Warga/Home"});
              localStorage.setItem("link", "/Warga/Home");
          }else if(shot.val().level === "RT"){
              // this.setState({link:"/RT/Home"});
              localStorage.setItem("link", "/RT/Home");
          }else if(shot.val().level === "RW"){
              // this.setState({link:"/RW/Home"});
              localStorage.setItem("link", "/RW/Home");
          }else if(shot.val().level === "Admin"){
              // this.setState({link:"/Admin/Home"});
              localStorage.setItem("link", "/Admin/Home");
          }else if(shot.val().level === "Satpam"){
            // this.setState({link:"/Admin/Home"});
            localStorage.setItem("link", "/Security/Home");
        }else if(shot.val().level === "Sekretaris"){
          // this.setState({link:"/Admin/Home"});
          localStorage.setItem("link", "/Sekretaris/Home");
      }else if(shot.val().level === "Bendahara"){
        // this.setState({link:"/Admin/Home"});
        localStorage.setItem("link", "/Bendahara/Home");
      }else if(shot.val().level === "Panitia"){
        console.log("berhasil")
        // localStorage.setItem("link", "/Panitia/Home")
      }
          // this.setState({link:"/redirectLink"});
          this.setState({redirect:true});
          })
          this.setState({ tasks2 });
          if(tasks2.length){

          }else{
            this.setState({msg:["warning", "Email anda tidak terdaftar di system, silahkan menghubungi Admin!"]})
            localStorage.removeItem("userData");
                localStorage.removeItem("nama");
                localStorage.removeItem("nik");
				        localStorage.removeItem("level");
				        localStorage.removeItem("kodeuser");
          }
        })



  }
	onChange(e){
        e.preventDefault();
		this.setState({[e.target.name] : e.target.value});
		// console.log(this.state);
	}
	login = (e) => {
    try{
    e.preventDefault();
    
    let lastAtPos = this.state.email.lastIndexOf('@');
    let lastDotPos = this.state.email.lastIndexOf('.');
    if(this.state.email === ""){
      this.setState({msg:["danger", "Email Tidak Boleh Kosong"]})
    }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
      this.setState({msg:["danger", "Email Tidak Valid"]})
    }else if(this.state.password === ""){
      this.setState({msg:["danger", "Password Tidak Boleh Kosong"]})

    }else{
        RefUser.orderByChild("email").equalTo(this.state.email).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key });
						RefWarga.orderByChild("nik").equalTo(shot.val().nik).on("value", snap => {
							snap.forEach(shott => {
								localStorage.setItem("foto", shott.val().urlfoto)
								//console.log(shott.val().urlfoto)
							})
						})
            if(shot.val().password == this.state.password){
                localStorage.setItem("nama", shot.val().email);
                localStorage.setItem("nik", shot.val().nik);
                localStorage.setItem("level", shot.val().level);
                localStorage.setItem("kodeuser", shot.val().kd_user);
                if(shot.val().level === "Warga"){
                    // this.setState({link:"/Warga/Home"});
										localStorage.setItem("link", "/Warga/Home");
                }else if(shot.val().level === "RT"){
                    // this.setState({link:"/RT/Home"});
										localStorage.setItem("link", "/RT/Home");
                }else if(shot.val().level === "RW"){
                    // this.setState({link:"/RW/Home"});
										localStorage.setItem("link", "/RW/Home");
                }else if(shot.val().level === "Admin"){
                    // this.setState({link:"/Admin/Home"});
										localStorage.setItem("link", "/Admin/Home");
                }else if(shot.val().level === "Satpam"){
                    // this.setState({link:"/Admin/Home"});
										localStorage.setItem("link", "/Security/Home");
                }else if(shot.val().level === "Sekretaris"){
                  // this.setState({link:"/Admin/Home"});
                  localStorage.setItem("link", "/Sekretaris/Home");
              }else if(shot.val().level === "Bendahara"){
                // this.setState({link:"/Admin/Home"});
                localStorage.setItem("link", "/Bendahara/Home");
              }else if(shot.val().level === "Panitia"){
                localStorage.setItem("link", "/Panitia/Home")
              }
								this.setState({link:"/redirectLink"});
                this.setState({redirect:true});
            }else{
                this.setState({msg:["warning", "Password yang anda inputkan salah!"]})
            }
          });
          this.setState({ tasks });
          if(tasks.length){
          }else{
            this.setState({msg:["danger", "Email Anda tidak terdaftar"]})
          }
        });

      }
    }catch(error){
      
    }
  }


  render() {
    if(this.state.redirect){
        return (<Redirect to={this.state.link}/>)
    }
		if(this.state.redirectLink){
			return (<Redirect to="RedirectLink"/>)
		}
    if(this.state.msg[0]!==''){
        var alrt = <div className={'alert alert-'+this.state.msg[0]}>
                      <strong>{this.state.msg[0]}:</strong> {this.state.msg[1]}.
                    </div>;
    }


    const responseGoogle = (response) => {
      // console.log("google console");
      // console.log(response);
      this.signup(response, 'google');
    }
    return (
    //  <div>
		//  	 <Header/>
    //     <div className="container">

    //         <div className="box-login center shadow-res">
    //             <div className="box-header bg-blue text-center text-white">
    //                 Signin Wargaku.id
    //             </div>
    //             <div className="box-body">
    //                 {/*<form >*/}
    //                 {alrt}
    //                 <form onSubmit={this.login}>
		// 									<div className="form-group">
		// 											<label>Email</label>
		// 											<input type="text" on name="email" required placeholder="email..." className="form-control" onChange={this.onChange}/>
		// 									</div>
		// 									<div className="form-group">
		// 											<label>Password</label>
		// 											<input type="password" name="password" required placeholder="password..." className="form-control" onChange={this.onChange}/>
		// 									</div>
		// 									<div className="form-group">
		// 											<input type="submit" className="btn btn-blue btn-block" value="Masuk" onClick={this.login}/>
    //                       <GoogleLogin
    //           clientId="242571537155-vfe4dro5vk0ibvtshdeab80kp1bcsquh.apps.googleusercontent.com"
    //           buttonText="Login with Google"
    //           className="btn btn-primary btn-block"
    //           onSuccess={responseGoogle}
    //           onFailure={responseGoogle}/>
    //                   </div>

    //                 </form>
		// 								{/*</form>*/}
    //             </div>
    //         </div>
    //     </div>
    //  <Footer/>
    //  </div>
    <div className="login">
    <div className="row">
      <div className="col-md-5 form-left fixed bg-warning text-center text-white">
        <div className="text-white">
          <h2>Selamat Datang di PermataJingga</h2>
          <img src={logobaru} alt="" style={{width:100+"px",width:100+"px"}}/>
        </div>
      </div>
      <div className="col-md-8 form-right fixed">
        <div className="form-login top-80">
          <h3 className="text-warning">Login Ke Akun Anda</h3>
          <form className="top-50"onSubmit={this.login}>
          {alrt}
            <div className="col-md-12">
              <div className="form-group col-md-12">
               <label for="exampleInputEmail1">Email</label>
               {/* <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/> */}
               <input type="text" on name="email" required placeholder="email..." className="form-control" onChange={this.onChange}/>
             </div>
             </div>
             <div className="col-md-12">
              <div className="form-group col-md-12">
               <label for="exampleInputPassword1">Password</label>
               {/* <input type="password" className="form-control" id="exampleInputPassword1" placeholder="**********"/> */}
               <input type="password" name="password" required placeholder="password..." className="form-control" onChange={this.onChange}/>
             </div>
            </div>
             {/* <small id="emailHelp" className="form-text text-muted">Tidak Memiliki Akun? <a href="register.html">Daftar</a></small> */}
             <input type="submit" className="btn btn-warning float-left" value="Masuk" onClick={this.login}/>
             {/* <button type="submit" className="btn btn-warning float-right">Masuk</button> */}
             <GoogleLogin
              clientId="242571537155-vfe4dro5vk0ibvtshdeab80kp1bcsquh.apps.googleusercontent.com"
              buttonText="Login with Google"
              className="btn btn-warning float-right"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}/>
          </form>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default Signin;
