import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listIuran';
import { RefIuran } from './../../../../db';
export default class daftaragenda extends React.Component {
  state = {
    tasks: [], tasksLoading: true,search:'',judul:''
  };

  componentDidMount() {
    
    let no = 0;
    RefIuran.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
      
      snap.forEach(shot => {
        if(shot.val().norw === localStorage.getItem("koderw")){
          no++;

        }else{
        }
      });
     // this.setState({ tasks, tasksLoading: false });
    });
      
      RefIuran.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
      const tasks = [];
        snap.forEach(shot => {
          if(shot.val().norw === localStorage.getItem("koderw")){
            tasks.push({ ...shot.val(), key: shot.key, nomer: no-- });

          }else{
          //no++;
        }
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }
  handleFilter = event => {
        this.setState({ search: event.target.value });
  };
  render() {
    const { tasks, tasksLoading,search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.databulan.indexOf(this.state.search)!==-1 || ls.jumlah_iuran.indexOf(this.state.search)!==-1 || ls.status_iuran.indexOf(this.state.search)!==-1;
        }
      ), ['ordertime'], ['desc']
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <div className='row col-md-12' style={{ marginBottom: 1+'em'}}>
            <div className='col-md-8 float-left'>
            
             
            </div>
            <div className='col-md-4 float-right'>
                <input type='text' className='form-control' placeholder='Masukkan Keyword' value={search} onChange={this.handleFilter}/>
            </div>
          </div>
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Bulan</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Status Iuran</th>
                        <th scope="col">Warga Membayar</th>
                        <th scope="col">Est. Uang Di Dapatkan</th>
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
      taskList = <div className="TaskList-empty">Tidak Ada Data Iuran</div>;
    }

    return taskList;
  }
}
