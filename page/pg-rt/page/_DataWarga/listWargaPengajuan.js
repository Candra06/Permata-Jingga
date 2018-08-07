import React from 'react';
import { rootRef, RefWarga, RefKK, RefPengajuan } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import { Action } from "./../../../../Action";
export default class ListWargaPengajuan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        nikrt:'',
        kode:'',
        kunci: '',
        valid:'',
        nama:'',
        status:'',
        tgl_lahir:'',
        gender:'',
        nik:'',
        agama:'',
        no_kk:''


      }
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    componentWillMount(){
      const { task } = this.props;
      //  RefKK.orderByChild("nokk").equalTo(task.no_kk).on('value', snap => {
      //     const tasks = [];
      //     snap.forEach(shot => {
      //       console.log(shot.val());
      //     });
      //     this.setState({ tasks, tasksLoading: false });
      //   });
    }
    handleChangeKode = event => {
      this.setState({kode:event.target.value});
      if(event.target.value == ''){
        this.setState({valid:"is-invalid"});
      }
    }
    cetak = event => {
      const { task } = this.props;
      var idrt='';
      var idrw='', alamat='', nikrt='', namart='';
      var teks= '';
      console.log(task.pemohon);
      RefWarga.orderByChild("nik").equalTo(task.pemohon).on('value', snap => {
        snap.forEach(shot => {
          console.log(shot.val());
          localStorage.setItem("nama_pemohon", shot.val().nama);
          // this.setState({nama:shot.val().nama});
          // console.log(shot.val().nama);
          localStorage.setItem("status", shot.val().status);
          // this.setState({status:shot.val().status});
          localStorage.setItem("tgl_lahir", shot.val().tgl_lahir);
          localStorage.setItem("tempatlahir", shot.val().tempatlahir);
          // this.setState({tgl_lahir:shot.val().tgl_lahir});
          localStorage.setItem("gender", shot.val().gender);
          // this.setState({gender:shot.val().gender});
          localStorage.setItem("nik_pemohon", shot.val().nik);
          // this.setState({nik:shot.val().nik});
          localStorage.setItem("agama", shot.val().agama);
          // this.setState({agama:shot.val().agama});
          localStorage.setItem("vno_kk", shot.val().no_kk);

        });
      });

      RefPengajuan.orderByChild("pemohon").equalTo(task.pemohon).on('value', snap => {
        snap.forEach(shott => {
          if(shott.val().status === "Proses"){
              teks = shott.val().kebutuhan;
              localStorage.setItem("teks", teks);
          }
        });
      });
      console.log(this.state);
      var htg = {
        id_surat:RandomKata.generate(10),
        kode_surat:this.state.kode,
        nik_pembuat:localStorage.getItem("nik"),
        nik_pemohon:task.pemohon
      }
      console.log(localStorage.getItem("vno_kk"));
      RefKK.orderByChild("nokk").equalTo(localStorage.getItem("vno_kk")).on('value', snap => {
        snap.forEach(shot => {
          idrt = shot.val().idrt;
          idrw = shot.val().idrw;
          alamat = shot.val().alamat;
          localStorage.setItem("vidrt", shot.val().idrt);
          localStorage.setItem("vidrw", shot.val().idrw);
          localStorage.setItem("alamat", shot.val().alamat);
        });
      });
      Action("addSurat", htg).then ((result) => {
          console.log(result);
          if(result!=''){
              console.log("success");
              console.log(result);
          }else{
              console.log("errors");
          }
      })
      // console.log(localStorage.getItem('nama_pemohon'));
      window.open("http://webbeta.wargaku.id/apps?nama_pemohon="+localStorage.getItem('nama_pemohon')+"&id_surat="+htg.id_surat+"&kebutuhan="+localStorage.getItem("teks")+"&tempat_lahir="+localStorage.getItem('tempatlahir')+"&status="+localStorage.getItem('status')+"&tanggal_lahir="+localStorage.getItem('tgl_lahir')+"&jenis_kelamin="+localStorage.getItem('gender')+"&idrt="+localStorage.getItem("idrt")+"&idrw="+localStorage.getItem("vidrw")+"&nik="+localStorage.getItem('nik_pemohon')+"&agama="+localStorage.getItem('agama')+"&alamat="+localStorage.getItem('alamat')+"&no_kk="+localStorage.getItem('no_kk')+"&nikrt="+nikrt+"&kode="+this.state.kode+"&nama_rt="+localStorage.getItem("nama"), "_blank");
    }
  render() {
    const { task } = this.props;
    return (
        <tr>
        <td>{task.pemohon}</td>
        <td>{task.jenis_kebutuhan}</td>
        <td>{task.kebutuhan}</td>
        <td>{task.status}</td>
        <td>
                <span>  </span>
              <Button color="info" onClick={this.toggle}>Cetak Surat</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Form Input kode surat</ModalHeader>
                  <ModalBody>
                      <div className="col-md-12">
                          <label>kode surat</label>
                          <input type="text"
                          onChange={this.handleChangeKode}
                          value={this.state.kode}
                          className={"form-control "+this.state.valid} placeholder="Masukkan kode surat"/>
                           <div className="invalid-feedback">
                            kode harus diisi
                          </div>
                      </div>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                      <Button color="danger" onClick={(e) => this.cetak(task.pemohon, task.kebutuhan)}>Cetak Data</Button>

                  </ModalFooter>
              </Modal>
        </td>
    </tr>
    );
  }
}
