import React from 'react';
import orderBy from 'lodash/orderBy';
import ListPenitipanBaru from './ListPenitipanBaru';
import { RefPenitipan } from './../../../../db';
export default class DataPenitipan extends React.Component {
  state = {
    tasks: [],
    tasksLoading: true,
    search: ''
  };

  componentDidMount() {
    RefPenitipan.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  handleFilter = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { tasks, tasksLoading, search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.nama_penitip.indexOf(this.state.search)!==-1;
        }
      ),
      ['ordertime'],['desc']
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (

      	 <div className="row">
         <div className='row col-md-12'>
            <div className='col-md-4 right'>
                <input type='text' className='form-control' placeholder='cari data nama pemilik rumah' value={search} onChange={this.handleFilter}/>
            </div>
          </div>
          <section className='col-12'>

            <div className="tab-pane" id="timeline">
            <ul className="timeline timeline-inverse">
		        {orderedTasks.map(task => (
		            <ListPenitipanBaru key={task.key} task={task} />
		          ))}
            </ul>
          </div>
          </section>

        </div>
      );
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada Data Penitipan</div>;
    }

    return taskList;
  }
}
