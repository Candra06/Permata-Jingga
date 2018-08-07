import React from 'react';
import { rootRef, RefKK } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
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
       RefKK.orderByChild("nokk").equalTo(task.no_kk).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            console.log(shot.val());
          });
          this.setState({ tasks, tasksLoading: false });
        });
    }
    handleChangeKode = event => {
      this.setState({kode:event.target.value});
      if(event.target.value == ''){
        this.setState({valid:"is-invalid"});
      }
    }
    cetak = event => {
      const { task } = this.props;
      var idrt, idrw, alamat, nikrt, namart;
      RefKK.orderByChild("nokk").equalTo(task.no_kk).on('value', snap => {
        snap.forEach(shot => {
          idrt = shot.val().idrt;
          idrw = shot.val().idrw;
          alamat = shot.val().alamat;
        });
      });
      // alert();
      window.open("http://webbeta.wargaku.id/apps?nama_pemohon="+task.nama+"&tempat_lahir="+task.tempatlahir+"&status="+task.status+"&tanggal_lahir="+task.tgl_lahir+"&jenis_kelamin="+task.gender+"&idrt="+idrt+"&idrw="+idrw+"&nik="+task.nik+"&agama="+task.agama+"&alamat="+alamat+"&no_kk="+task.no_kk+"&nikrt="+nikrt+"&kode="+this.state.kode, "_blank");
    }
  render() {
    const { task } = this.props;
    return (
        <tr>
        <td>{task.no_kk}</td>
        <td>{task.nama}</td>
        <td>{task.nik}</td>
        <td>{task.gender}</td>
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
                      <Button color="danger" onClick={this.cetak}>Cetak Data</Button>

                  </ModalFooter>
              </Modal>
        </td>
    </tr>
    );
  }
}
