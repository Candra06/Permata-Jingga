import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listpeserta';
import { Redirect } from 'react-router-dom';
import { rootRef, RefWarga } from './../../../../../db';
export default class daftarpeserta extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          tasks: [], tasksLoading: true,search:'',judul:'', redirect: false
        };
      }

  componentDidMount() {
    const {kode} = this.props;
    rootRef.child("PesertaAgenda").orderByChild("kd_event").equalTo(kode).on('value', snap => {
        
    let no = 0;
    const tasks = [];
      snap.forEach(shot => {
      
            RefWarga.orderByChild("nik").equalTo(shot.val().kd_penerima).on('value', snap => {
        
          snap.forEach(shott => {
           if(shot.val().status_agenda === "Hapus"){

        }else{
          no++;
          tasks.push({ ...shot.val(), key: shot.key, nomer: no, nama: shott.val().nama });
        }
          });
     this.setState({ tasks, tasksLoading: false });
        });
        
      
      });
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
          return ls.nama.indexOf(this.state.search)!==-1 || ls.status_terima.indexOf(this.state.search)!==-1 || ls.status_bayar.indexOf(this.state.search)!==-1;
        }
      )
    );

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        <div className="table-responsive">
        <div className='row col-md-12'>
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
                        <th scope="col">Nama</th>
                        <th scope="col">Status Terima</th>
                        <th scope="col">Status Bayar</th>
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
      taskList = <div className="TaskList-empty">Tidak Ada Data Peserta</div>;
    }

    return taskList;
  }
}
