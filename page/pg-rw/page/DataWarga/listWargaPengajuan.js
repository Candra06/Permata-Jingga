import React from 'react';
import { rootRef, RefKK, RefPengajuan, RefWarga } from './../../../../db';
import RandomKata from "randomstring";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
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
        valid:''
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
       //RefKK.orderByChild("nokk").equalTo(task.no_kk).on('value', snap => {
         // const tasks = [];
          //snap.forEach(shot => {
            //console.log(shot.val());
          //});
          //this.setState({ tasks, tasksLoading: false });
        //});
    }
    handleChangeKode = event => {
      this.setState({kode:event.target.value});
      if(event.target.value == ''){
        this.setState({valid:"is-invalid"});
      }
    }
    cetak(datanik, datakebutuhan) {

      const { task } = this.props;
      var idrt='';
      var idrw='', alamat='', nikrt='', namart='';
      var teks= '';
      for(let i = 0; i < 3; i++){
      RefWarga.orderByChild("nik").equalTo(datanik).on('value', snap => {
        snap.forEach(shottt => {
          console.log(shottt.val())
          localStorage.setItem("vnokk", shottt.val().no_kk);
          localStorage.setItem("vnama", shottt.val().nama);
          localStorage.setItem("vtempatlahir", shottt.val().tempatlahir);
          localStorage.setItem("vtgllahir", shottt.val().tgl_lahir);
          localStorage.setItem("vstatus", shottt.val().status);
          localStorage.setItem("vgender", shottt.val().gender);
          localStorage.setItem("vagama", shottt.val().agama);
        });
      });
      console.log("data kknya",localStorage.getItem("vnokk"));

      RefPengajuan.orderByChild("pemohon").equalTo(localStorage.getItem("vnokk")).on('value', snap => {
        snap.forEach(shott => {
          if(shott.val().status === "Proses"){
              teks = shott.val().kebutuhan;
              localStorage.setItem("teks", teks);
          }
        });
      });
      RefKK.orderByChild("nokk").equalTo(localStorage.getItem("vnokk")).on('value', snap => {
        snap.forEach(shot => {
          idrt = shot.val().idrt;
          idrw = shot.val().idrw;
          alamat = shot.val().alamat;
          localStorage.setItem("idrt", shot.val().idrt);
          localStorage.setItem("idrw", shot.val().idrw);
          localStorage.setItem("alamat", shot.val().alamat);
        });
      });
      var htg = {
        id_surat:RandomKata.generate(10),
        kode_surat:this.state.kode,
        nik_pembuat:localStorage.getItem("nik"),
        nik_pemohon:datanik
      }
      Action("addSurat", htg).then ((result) => {
          console.log(result);
          if(result!=''){
              console.log("success");
          }else{
              console.log("errors");
          }
      })
      // alert();
      console.log("ke : ", i);
    }
      window.open("http://webbeta.wargaku.id/apps/PengantarRW?nama_pemohon="+localStorage.getItem("vnama")+"&id_surat="+htg.id_surat+"&kebutuhan="+datakebutuhan+"&tempat_lahir="+localStorage.getItem("vtempatlahir")+"&status="+localStorage.getItem("vstatus")+"&tanggal_lahir="+localStorage.getItem("vtgllahir")+"&jenis_kelamin="+localStorage.getItem("vgender")+"&idrt="+localStorage.getItem("idrt")+"&idrw="+localStorage.getItem("idrw")+"&nik="+datanik+"&agama="+localStorage.getItem("vagama")+"&alamat="+alamat+"&no_kk="+localStorage.getItem("vnokk")+"&nikrt="+nikrt+"&kode="+this.state.kode+"&nama_rt="+localStorage.getItem("nama"), "_blank");
    }
  render() {
    const { task } = this.props;
    return (
        <tr>
        <td>{task.pemohon}</td>
        <td>{task.jenis_kebutuhan}</td>
        <td>{task.tgl_pengajuan}</td>
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
