import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listevent';
import { RefEvent, RefHapus, upRef } from './../../../../db';
import RandomKata from 'randomstring';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
export default class daftarevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    tasks: [], tasksLoading: true, filter:'asc', modal2: false
  };

  this.toggle2 = this.toggle2.bind(this);
}
  
toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
}
  componentDidMount() {
    RefEvent.on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }
  handleChangeFilter = (event) => {
    this.setState({ filter: event.target.value});
    let jml = 0;
    RefEvent.on('value', snap => {
      snap.forEach(shot => {
        jml++;
      });
    });
    //console.log("jmlnya ", jml)

    RefEvent.on('value', snap => {
      const tasks = [];
      let no = 0;
      if(event.target.value === 'asc'){
        no = 0;
      }else if(event.target.value === 'desc'){
        no = jml + 1;
      }
      snap.forEach(shot => {
        
        if(event.target.value === 'asc'){
          no++;
        }else if(event.target.value === 'desc'){
          no--;
        }
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
    
  }

  deletePengumuman= () => {
    //console.log("terrrrrr")
    RefHapus.orderByChild("kodehapus").equalTo(localStorage.getItem("xkodeblog")).on('value', snap => {
      snap.forEach(shot => {
        RefEvent.orderByKey().equalTo(shot.val().kode).on('value', snap => {
          snap.forEach(shott => {
            upRef.child(shott.val().filename).delete().then(function() {

            })
          })
        })
          RefEvent.child(shot.val().kode).remove();
          RefHapus.child(shot.key).remove();
                 
      });
  });
  toast.success('Data Berhasil Di Hapus', {
    position: toast.POSITION.TOP_RIGHT,
});
localStorage.setItem("xkodeblog", RandomKata.generate(10))
this.toggle2();

  }
  render() {
    const { tasks, tasksLoading, filter } = this.state;
    const orderedTasks = orderBy(
      tasks, ['ordertime'], [filter]
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <div className="row">
        <div className="form-group col-md-2">
          <button className="btn btn-danger" onClick={this.toggle2}><i className="fa fa-trash"></i> Hapus Data Terpilih</button>
        </div>
        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                                        <ModalHeader toggle={this.toggle2}>Konfirmasi Penghapus Data</ModalHeader>
                                        <ModalBody>
                                            Data Blog Yang Di Pilih Akan di Hapus!!!
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.toggle2}>Batal</Button>{' '}
                                            <Button color="danger" onClick={(e) => this.deletePengumuman()}>Konfirmasi</Button>
                                        </ModalFooter>
                                    </Modal>
        <div className="form-group col-md-4">
            <select className="form-control" style={{height: 3 + 'em'}}  value={this.state.filter} onChange={this.handleChangeFilter}>
              <option value="">Pilih Filter</option>
              <option value="desc">Terbaru</option>
              <option value="asc">Terlama</option>
            </select>
          </div>
        </div>
        <table className="table">
            <thead>
                    <tr> 
                        <th scope="col"><i className="fa fa-check"></i></th>                              
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">foto</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listkk key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data Kiriman</div>;
    }

    return taskList;
  }
}