import React from 'react';

import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';
import { RefPengumuman, RefHapus, RefWarga, RefKK } from '../../../../db';
export default class ListPengumuman extends React.Component {
  constructor(props) {
    super(props);
this.state = {
    modal: false, cek: false, namapemohon: '', namapengirim:''
  }
  this.toggle = this.toggle.bind(this);
}
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteTask = () => {
    const { key } = this.props.task;
    RefPengumuman.child(key).remove();
   toast.success('Data Berhasil Di Hapus', {
      position: toast.POSITION.TOP_RIGHT,
       });
  };

  componentWillMount(){
    const { jenis, kd_penerima, kd_pembuat } = this.props.task;
    //console.log(jenis)
    if(jenis != "warga"){
    RefWarga.orderByChild("nik").equalTo(kd_penerima).on('value', snap => {
      //const tasks = [];
      snap.forEach(shott => {

      this.setState({ namapemohon : shott.val().nama });
      })
    })

    }else{
      RefKK.orderByChild("nokk").equalTo(kd_penerima).on('value', snap => {
        //const tasks = [];
        snap.forEach(shott => {

        this.setState({ namapemohon : "Keluarga "+ shott.val().kepala });
        })
      })

    }

    console.log(kd_pembuat)
    if(kd_pembuat != "Admin" && kd_pembuat != "admin"){
      RefWarga.orderByChild("nik").equalTo(kd_pembuat).on('value', snap => {
        //const tasks = [];
        snap.forEach(shott => {

        this.setState({ namapengirim : shott.val().nama });
        })
      })

      }else{
        this.setState({ namapengirim : kd_pembuat})
      }




  }


  handleInputChange = (event) => {
    //const { key } = this.props.task;
    this.setState({
        cek: false
      });


        const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      cek: value
    });
    //console.log(this.state.cek)
    if(value){
        const data = {
       kode: event.target.name,
       tipe: 'pengumuman',
       kodehapus: localStorage.getItem("xkodepengumuman")
       }
   RefHapus.push(data);


// console.log("simpan")
//         console.log(localStorage.getItem("xkodepengumuman"))
      // RefHapus.child(kunci).remove();
   }else if(!value){
       RefHapus.orderByChild("kode").equalTo(event.target.name).on('value', snap => {
           snap.forEach(shot => {

              RefHapus.child(shot.key).remove();
           });
       });

// console.log("hapus")
// console.log(localStorage.getItem("xkodepengumuman"))

   }
  }
  render() {
    const { task } = this.props;


    return (
        <tr><td>

        <input
        name = {task.key}
        type="checkbox"
        checked={this.state.cek}
       // checked={this.state.isGoing}
        onClick={this.handleInputChange}

        /></td>
        <td>{task.nomer}</td>
        <td>{this.state.namapengirim}</td>
        <td>{this.state.namapemohon}</td>
        <td>{task.isi}</td>
        <td>{task.jenis}</td>
        <td>{task.tanggal}</td>
        <td><button type="button" className="btn btn-danger" onClick={this.toggle}><i className="fa fa-trash"></i></button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data Pengumuman Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={this.deleteTask}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>

    </tr>
    );
  }
}
