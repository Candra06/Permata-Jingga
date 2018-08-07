import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listIuran';
import { Redirect } from 'react-router-dom';
import { rootRef, RefWarga, Refpesertaiuran } from './../../../../../db';
import NumberFormat from 'react-number-format';
export default class daftarpeserta extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          tasks: [], tasksLoading: true,search:'',judul:'', redirect: false,
          contentDisplay:false,
          items: 10,
          jumlah:0,
          loading:false
        };
      }

  componentDidMount() {
    const {kode} = this.props;  
    let jmldata=0;
    Refpesertaiuran.orderByChild("kd_iuran").equalTo(kode).on('value', snap => {
      snap.forEach(shot => {
        jmldata++
      });
      this.setState({ jumlah:jmldata });
    });

    Refpesertaiuran.limitToFirst(this.state.items).orderByChild("kd_iuran").equalTo(kode).on('value', snap => {
        
    let no = 0;
    const tasks = [];
      snap.forEach(shot => {
          no++;
          tasks.push({ ...shot.val(), key: shot.key, nomer: no });
      });
     this.setState({ tasks, tasksLoading: false });
    });
     document.addEventListener("scroll", () => {
        if(this.state.items <= this.state.jumlah){
          if ((window.innerHeight + (window.scrollY+1)) >= document.body.offsetHeight) {
              this.loadMore();
          }
        }
      });
  }

  
  loadMore=(xtipe)=> {
    
    const {kode} = this.props;  
    let number = (this.state.items+10);
    this.setState({items:number, loading: true})
    Refpesertaiuran.limitToFirst(number).orderByChild("kd_iuran").equalTo(kode).on('value', snap => {
        
      let no = 0;
      const tasks = [];
        snap.forEach(shot => {
            no++;
            tasks.push({ ...shot.val(), key: shot.key, nomer: no });
        });
       this.setState({ tasks, tasksLoading: false });
      });
  }
  handleFilter = event => {
        this.setState({ search: event.target.value });
  };
  render() {
    const {jumlah, databulan} = this.props;
    const { tasks, tasksLoading,search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.nokk.indexOf(this.state.search)!==-1 || ls.nama_keluarga.indexOf(this.state.search)!==-1 || ls.status_bayar.indexOf(this.state.search)!==-1 || ls.alamat.indexOf(this.state.search)!==-1;
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
        <div className='row col-md-12' style={{ marginBottom: 1+'em'}}>
            <div className='col-md-8 float-left'>
              <p>
                Jumlah Iuran <NumberFormat value={jumlah} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
              </p>
             
            </div>
            <div className='col-md-4 float-right'>
                <input type='text' className='form-control' placeholder='Masukkan Keyword' value={search} onChange={this.handleFilter}/>
            </div>
          </div>
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Keluarga</th>
                        <th scope="col">No KK</th>
                        <th scope="col">Status Bayar</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <Listkk key={task.key} task={task} jumlahiuran={jumlah} databulan={databulan}/>
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
