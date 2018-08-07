import React from 'react';
import { RefPengajuan, RefPenitipan, RefKK, RefRT, RefRW, timeRef, RefNotif } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
export default class Listpenitipan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        alert:'',
        alertstatus:false,
        statusPost:true,
        alamat:this.props.task.alamat,
        keterangan: this.props.task.keterangan,  tglAwal: this.props.task.tglAwal, tglAkhir:this.props.task.tglAkhir, idrt:'', idrw:''
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }
    handleChangeAlamat = event => {
      this.setState({alamat:event.target.value});
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
      componentWillMount(){
        console.log(this.props);
      }
      handleChangeTglAwal = event => {
        this.setState({ tglAwal: event.target.value });
      };

      handleChangeTglAkhir = event => {
        if(event.target.value < this.state.tglAwal){
          toast.warn('Form Isian Tidak valid');
          this.setState({alert:"Tanggal akhir anda tidak valid", alertstatus:true, statusPost:false, tglAkhir: event.target.value});
        }else{
          this.setState({alert:"", alertstatus:false, statusPost:true});
        }
      };

      handleChangeketerangan = event => {
        this.setState({ keterangan: event.target.value });
      };
      handleReset = event => {
        //event.preventDefault();
        this.setState({ keterangan: '', tglAkhir: '', tglAwal: '' });
      }

    deleteTask(nama){
        const notif2 = {
            nik_penerima: localStorage.getItem("nik"),
            nik_pengirim: localStorage.getItem("nik"),
            teks: " Menghapus Penitipan "+ nama,
            tipe: "merah-hapus",
            time_notif: timeRef
          };
          RefNotif.push(notif2);
        const { key } = this.props.task;
        RefPenitipan.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };

      notify(type, kunci){
        return () => {
        const newTask = {
          keterangan: this.state.keterangan.trim(),
          tglAwal: this.state.tglAwal.trim(),
          tglAkhir: this.state.tglAkhir.trim(),
        };
        if(this.state.statusPost){
          if (newTask.keterangan.length && newTask.tglAwal.length && newTask.tglAkhir.length) {
              RefPenitipan.child(kunci).update({ keterangan: this.state.keterangan,alamat:this.state.alamat, tglAwal: this.state.tglAwal, tglAkhir: this.state.tglAkhir });
          this.setState({keterangan: '', tglAwal: '', tglAkhir: ''});

          toast.success('Data Berhasil Di Update', {
                  position: toast.POSITION.TOP_RIGHT,
              });
              this.toggle2();
          }else{
              toast.warn('Form Masih ada yang kosong');
          }
        }else{
          toast.warn('Isian form tidak valid', {
              position: toast.POSITION.TOP_RIGHT,
            });
        }

            };
        };
  render() {
    const { task, alertstatus, alert } = this.props;
    let cek;
    let pesan;
    if(alertstatus){
      pesan = (
        <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 1 + 'em'}}>
        {alert}!!
          </div>
      )
    }
    if(task.status === "Pending"){
        cek = (
            <Button color="secondary">{task.status}</Button>
        );
    }else if(task.status === "Diterima"){
        cek = (
            <Button color="primary">{task.status}</Button>
        );
    }else if(task.status === "Ditolak"){
        cek = (
            <Button color="Danger">{task.status}</Button>
        );
    }else if(task.status === "Selesai"){
        cek = (
            <Button color="success">{task.status}</Button>
        );
    }
    return (
        <tr>
        <td>{task.tglAwal}</td>
        <td>{task.tglAkhir}</td>
        <td>{task.keterangan}</td>
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
                                  <div className='form-group col-sm-6'>
                                    <label>Tanggal Awal</label>
                                    <input type='date' placeholder='masukkan tanggal awal penitipan' onChange={this.handleChangeTglAwal} value={this.state.tglAwal}/>
                                  </div>
                                  <div className='form-group col-sm-6'>
                                    <label>Tanggal Akhir</label>
                                    <input type='date' placeholder='masukkan tanggal akhir penitipan' onChange={this.handleChangeTglAkhir} value={this.state.tglAkhir}/>
                                  </div>
                                  <div className="form-group col-sm-12">
                                      <label>keterangan</label>
                                      <textarea className="form-control" onChange={this.handleChangeketerangan}
                                      value={this.state.keterangan} rows="3" placeholder="Masukkan keterangan"></textarea>
                                  </div>
                                  <div className="form-group col-sm-12">
                                      <label>alamat</label>
                                      <textarea className="form-control" onChange={this.handleChangeAlamat}
                                      value={this.state.alamat} rows="3" placeholder="Masukkan alamat"></textarea>
                                  </div>
                                  {pesan}
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
                        Data Penitipan {task.nama_penitip} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={() => this.deleteTask(task.nama_penitip)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
