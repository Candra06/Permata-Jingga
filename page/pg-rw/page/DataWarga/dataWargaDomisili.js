import React from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listWargaDomisili';
import { RefWarga } from './../../../../db';

export default class DataWargaPengajuan extends React.Component {

    state = {
      tasks: [],
      filterGndr:''
    };


  componentDidMount() {
    RefWarga.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });

  }
  handleFilter = event => {
        this.setState({ filterGndr: event.target.value });
          if(event.target.value!=''){
            const tasks = [];
            RefWarga.orderByChild("gender").equalTo(event.target.value).once("child_added", function(snap) {
                tasks.push({ ...snap.val(), key: snap.key });
            });
            this.setState({ tasks, tasksLoading: false });
          }else{
            this.componentDidMount();
          }
  };
  render() {
    const { tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

    let taskList;
      taskList = (
        <div className="table-responsive">
        <div className='form-group col-6'>
          <select className='form-control' value={this.state.filterGndr} onChange={this.handleFilter}>
               <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No KK</th>
                        <th scope="col">Nama Warga</th>
                        <th scope="col">NIK</th>
                        <th scope="col">Jenis Kelamin</th>
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


    return taskList;
  }
}
