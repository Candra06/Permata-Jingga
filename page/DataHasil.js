import React from 'react';
import orderBy from 'lodash/orderBy';
import Listhasil from './listhasil';
import { RefImport } from './../db';
export default class DataHasil extends React.Component {
  state = {
    tasks: [], tasksLoading: true
  };

  componentDidMount() {
      const {kode} = this.props;
    RefImport.orderByChild("kodeimport").equalTo(kode).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
        
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }
relo(){
    
}
  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks, ['ordertime'],['asc']
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive"><br/>
        <label>Hasil Import <span onClick={(e) => window.location.reload()} style={{ color: "red"}}>X</span></label><br/><br/>
        <table className="table">
        <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">keterangan</th>
                </tr>
              </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listhasil key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Data</div>;
    }

    return taskList;
  }
}