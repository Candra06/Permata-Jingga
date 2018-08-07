import React from 'react';
import orderBy from 'lodash/orderBy';
import Listrt from './listkelurahan';
import { RefKelurahan, RefHapus } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import RandomKata from 'randomstring';
export default class daftarrt extends React.Component {
  constructor(props) {
    super(props);
this.state = {
    tasks: [], tasksLoading:true,
    modal: false,
    nama: '', tmpnama:''
  }
  this.toggle = this.toggle.bind(this);
}
  
toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    RefKelurahan.on('value', snap => {
      const tasks = [];
      let no =0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
      });
      this.setState({ tasks, tasksLoading: false });
    });

  }

  deleteTask= () => {
    //console.log("terrrrrr")
    RefHapus.orderByChild("kodehapus").equalTo(localStorage.getItem("xkodekelurahan")).on('value', snap => {
      snap.forEach(shot => {
          RefKelurahan.child(shot.val().kode).remove();
          RefHapus.child(shot.key).remove();
                 
      });
  });
  toast.success('Data Berhasil Di Hapus', {
    position: toast.POSITION.TOP_RIGHT,
});
localStorage.setItem("xkodekelurahan", RandomKata.generate(10))
this.toggle();
  }
  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <div className="row col-md-4">
          <button className="btn btn-danger" onClick={this.toggle}><i className="fa fa-trash"></i> Hapus Data Terpilih</button>
        </div>
        <table className="table">
            <thead>
                    <tr>
                        {/* <th scope="col" style={{ width: 1 + 'em'}}><i className="fa fa-check"></i></th> */}
                        <th scope="col" style={{ width: 1 +'em'}}>No</th>
                        <th scope="col">Nama Kelurahan</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listrt key={task.key} task={task} />
          ))}
        </tbody>
        </table>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data Kelurahan Yang Di Pilih Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={this.deleteTask}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Kelurahan</div>;
    }

    return taskList;
  }
}