import React from 'react';
import orderBy from 'lodash/orderBy';
import ListPengajuanBaru from './notifPengajuan';
import { RefPengajuan, RefWarga, RefSurat } from './../../../../db';
export default class DataPengajuan extends React.Component {
  state = {
    tasks: [], tasksLoading:true
  };

  componentDidMount() {
    // localStorage.setItem("nik", "12345");
    RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      snap.forEach(shott => {
        RefWarga.orderByChild("nik").equalTo(shott.val().pemohon).on("value", snap => {
          snap.forEach(shot => {
            RefSurat.orderByChild("kd_surat").equalTo(shott.val().jenis_kebutuhan).on("value", snap => {
              snap.forEach(shottt => {
                tasks.push({ ...shott.val(), key: shott.key, user:shot.val(), kd_surat:shottt.val().kode_surat, jenis_surat:shottt.val().jenis_surat });
              })
              this.setState({ tasks, tasksLoading: false });
            })
          })
        })
      });
      this.setState({tasksLoading:false})
    });
  }

  render() {
    const { tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks,
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
          <section className='col-12'>
            <div className="tab-pane" id="timeline">
            <ul className="timeline timeline-inverse">
		        {orderedTasks.map(task => (
		            <ListPengajuanBaru key={task.key} task={task} />
		          ))}
            </ul>
          </div>
          </section>

        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Pengajuan</div>;
    }

    return taskList;
  }
}
