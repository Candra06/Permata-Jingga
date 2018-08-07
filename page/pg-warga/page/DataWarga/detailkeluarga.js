import React from 'react';
import orderBy from 'lodash/orderBy';
import { RefWarga, RefKK } from './../../../../db';

export default class detailkeluarga extends React.Component {
  state = {
    tasksLoading: true, alamat:'', idrw:'', idrt:'', namakepala:'', nomerkk:''
  };

  componentDidMount() {
    //let nokku = "";
    RefWarga.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      //const tasks = [];
      snap.forEach(shott => {
       // console.log("datanya:", shott.val())
        //tasks.push({ ...shot.val(), key: shot.key });
        
    RefKK.orderByChild("nokk").equalTo(shott.val().no_kk).on('value', snap => {
      let xnomerkk = "",xalamat='', xidrw='', xidrt='', xnamakepala='';
      snap.forEach(shot => {
        xnomerkk = shot.val().nokk;
        xalamat = shot.val().alamat;
        xidrw = shot.val().idrw;
        xidrt = shot.val().idrt;
        xnamakepala = shot.val().kepala;
      });
      this.setState({ alamat:xalamat, idrw:xidrw, idrt:xidrt, namakepala:xnamakepala, nomerkk:xnomerkk, tasksLoading: false });
    });
      });
      this.setState({ tasksLoading: false });
    });

  }

  render() {
      

    const { tasksLoading } = this.state;
    let taskList;
    if (tasksLoading) {
        taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      } else if (!tasksLoading) {
      taskList = (
        <div className="row">
        <div className="form-group col-sm-3">
            <label>No KK :</label>
            <p>
            {this.state.nomerkk}
            </p>
        </div>
            <div className="form-group col-sm-3">
                <label>Kepala Keluarga :</label>
                <p>
                {this.state.namakepala}
                </p>
            </div>
            <div className="form-group col-sm-2">
                <label>RW/RT</label>
                <p>
                {this.state.idrw}/{this.state.idrt}
                </p>
            </div>
            <div className="form-group col-sm-4">
                <label>Alamat :</label>
                <p>
                {this.state.alamat}
                </p>
            </div>
            
        </div>
      );
    }

    return taskList;
  }
}
