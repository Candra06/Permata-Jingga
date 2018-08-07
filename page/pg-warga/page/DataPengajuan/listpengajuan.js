import React from 'react';
import { RefPengajuan, RefKK, RefRT, RefRW, timeRef, RefNotif, RefSurat } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
export default class Listpengajuan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        kebutuhan: '', jenis_kebutuhan: '', tujuan:'', idrt:'', idrw:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(xjenis, xkebutuhan, xtujuan) {
        this.setState({
            kebutuhan: xkebutuhan,
            jenis_kebutuhan: xjenis,
            tujuan: xtujuan,
          modal2: !this.state.modal2
        });
      }

      handleChangeKebutuhan = event => {
        this.setState({ kebutuhan: event.target.value });
      };

      handleChangeJenis = event => {
        this.setState({ jenis_kebutuhan: event.target.value });
      };

      handleChangeTujuan = event => {
        this.setState({ tujuan: event.target.value });
        RefKK.orderByChild("nokk").equalTo(localStorage.getItem("no_kk")).on('value', snap => {
            const tasks = [];
            snap.forEach(shot => {
              tasks.push({ ...shot.val(), key: shot.key });
              this.setState({ idrt: shot.val().idrt, idrw: shot.val().idrw});
            });
            console.log(this.state.idrt);
            this.setState({ tasks});
          });
        if(event.target.value  === "RT"){
            RefRT.orderByChild("no").equalTo(this.state.idrt).on('value', snap => {
                const tasks2 = [];
                snap.forEach(shot => {
                  tasks2.push({ ...shot.val(), key: shot.key });
                  if(this.state.idrw === shot.val().norw){
                    localStorage.setItem("terima", shot.val().nik);
                  }
                });
                this.setState({ tasks2});
              });
        }else if(event.target.value  === "RW"){
            RefRW.orderByChild("no").equalTo(this.state.idrw).on('value', snap => {
                const tasks3 = [];
                snap.forEach(shot => {
                  tasks3.push({ ...shot.val(), key: shot.key });

                  localStorage.setItem("terima", shot.val().nik);

                });
                this.setState({ tasks3});
              });
        }
      };
      handleReset = event => {
        //event.preventDefault();
        this.setState({ kebutuhan: '', jenis_kebutuhan: '', tujuan: '', tgl_pengajuan:'' });
      }

    deleteTask(xjenis, xtujuan){
        let namajenis="";
        RefSurat.orderByChild("kd_surat").equalTo(xjenis).on('value', snap => {
            const tasks = [];
            snap.forEach(shot => {
                namajenis= shot.val().jenis_surat;
            })
        })
        const notif2 = {
            nik_penerima: localStorage.getItem("nik"),
            nik_pengirim: localStorage.getItem("nik"),
            teks: " Menghapus Pengajuan "+ namajenis +" Kepada Ketua "+ xtujuan ,
            tipe: "merah-hapus",
            time_notif: timeRef
          };
          RefNotif.push(notif2);
        const { key } = this.props.task;
        RefPengajuan.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };

      notify(type, kunci){
        return () => {
        const newTask = {
            kebutuhan: this.state.kebutuhan.trim(),
            jenis_kebutuhan: this.state.jenis_kebutuhan.trim(),
            tujuan: this.state.tujuan.trim(),
        };
                if (newTask.kebutuhan.length && newTask.jenis_kebutuhan.length && newTask.tujuan.length) {
                    RefPengajuan.child(kunci).update({ kebutuhan: this.state.kebutuhan, jenis_kebutuhan: this.state.jenis_kebutuhan, tujuan: this.state.tujuan, idpenerima: localStorage.getItem("terima") });
                this.setState({kebutuhan: '', jenis_kebutuhan: '', tujuan: '', tgl_pengajuan:''});

                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2();
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };
  render() {
    const { task } = this.props;
    let cek;

    if(task.status === "Pending"){
        cek = (
            <Button color="secondary">{task.status}</Button>
        );
    }else if(task.status === "Proses"){
        cek = (
            <Button color="warning">{task.status}</Button>
        );
    }else if(task.status === "Selesai"){
        cek = (
            <Button color="success">{task.status}</Button>
        );
    }else if(task.status === "Tolak"){
        cek = (
            <Button color="Danger">{task.status}</Button>
        );
    }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.jenis_surat}</td>
        <td>{task.kebutuhan}</td>
        <td>{task.tujuan}</td>
        <td>{cek}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.jenis_kebutuhan, task.kebutuhan, task.tujuan)}>Edit</Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}>
                <div className="card-header card-info">
                            <h3 className="card-title">Update Data Pengajuan {task.nokk}</h3>
                        </div>
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                            <div className="card-body">
                                <div className="row col-12">
                                    <div className="form-group mb-3 col-12">
                                        <label>Tujuan Pengajuan</label>
                                        <select className="form-control" value={this.state.tujuan} onChange={this.handleChangeTujuan}>
                                            <option value="">Tujuan Pengajuan</option>
                                            <option value="RT">RT</option>
                                            <option value="RW">RW</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3 col-12">
                                        <label>Jenis Kebutuhan </label>
                                        <select className="form-control" value={this.state.jenis_kebutuhan} onChange={this.handleChangeJenis}>
                                            <option value="">Jenis Kebutuhan </option>
                                            <option value="Pembuatan SKTM">Pembuatan SKTM</option>
                                            <option value="Pembuatan KK">Pembuatan KK</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-12">
                                        <label>Kebutuhan</label>

                                        <input type="text"
                                        onChange={this.handleChangeKebutuhan}
                                        value={this.state.kebutuhan}
                                        className="form-control" placeholder="Masukkan Kebutuhan"/>
                                    </div>



                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                </Modal>
            <span>  </span>
                <Button color="danger" onClick={this.toggle}>Delete</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data KK {task.nokk} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={() => this.deleteTask(task.jenis_kebutuhan, task.tujuan)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
