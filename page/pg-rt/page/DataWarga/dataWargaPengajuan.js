import React from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listWargaPengajuan';
import { RefWarga, RefPengajuan, RefKK } from './../../../../db';

export default class DataWargaPengajuan extends React.Component {

    state = {
      tasks: [],
      filterGndr:'',
      tasksLoading: true
    };


  componentDidMount() {
    // let z = Object.assign(x, y)
    console.log(localStorage.getItem("nik"));
    RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem('nik')).on('value', snap => {
      const tasks = [];
      // console.log(snap);/
      snap.forEach(shot => {
        // localStorage.setItem("nokk", shot.val().nokk);
        // RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on('value', snapshot => {
          // snapshot.forEach(shott => {
          // console.log("Work");
          if(shot.val().status == "Proses"){
              tasks.push({ ...shot.val(), key: shot.key });
              console.log(shot.val());
          }
          // });
          // console.log(tasks);

        // });
      });
      this.setState({ tasks, tasksLoading: false });
    });
    // RefWarga.on('value', snapshot => {
    //   const tasks = [];
    //   snapshot.forEach(shot => {
    //     tasks.push({ ...shot.val(), key: shot.key });
    //   });
    //   this.setState({ tasks, tasksLoading: false });
    //
    // });
  }
  handleFilter = event => {
        this.setState({ filterGndr: event.target.value });
          if(event.target.value!==''){
            const tasks = [];
            RefWarga.orderByChild("gender").equalTo(event.target.value).once("child_added", function(snap) {
                tasks.push({ ...snap.val(), key: snap.key });
            });
            this.setState({ tasks, tasksLoading: false });
          }else{
            this.componentDidMount();
          }
  };
  handleFilterInput = event =>{
    if(event.target.value!==''){
        const tasks = [];
        RefWarga.orderByChild("gender").equalTo(event.target.value).once("child_added", function(snap) {
            tasks.push({ ...snap.val(), key: snap.key });
        });
        this.setState({ tasks, tasksLoading: false });
      }else{
        this.componentDidMount();
      }
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
    }else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No NIK</th>
                        <th scope="col">Jenis Pengajuan</th>
                        <th scope="col">Pengajuan</th>
                        <th scope="col">Status</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listwarga key={task.key} task={task} />
          ))}
        </tbody>
        </table>

        </div>
      );
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada Notifikasi</div>;
    }

    return taskList;
  }
}
