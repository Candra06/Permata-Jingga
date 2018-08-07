import React from 'react';
import orderBy from 'lodash/orderBy';
import ListPengajuanBaru from './listPengajuan';
import { RefPengajuan, RefWarga, RefSurat } from './../../../../db';
export default class DataPengajuan extends React.Component {
  state = {
    tasks: [],
    tasksLoading: true,
    gridnumber:0,
      contentDisplay:false,
      items: 10,
      jumlah:0,
      search:"",
      loading:false,
  };

  componentDidMount() {
      

      RefPengajuan.orderByChild("idpenerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
        let no =1;
        snap.forEach(shot => {
          no++;
        });
        this.setState({ jumlah:++no });
      });
    RefPengajuan.limitToFirst(this.state.items).orderByChild("idpenerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      let nomor = 0;
      const tasks = [];
      snap.forEach(shot => {
        nomor++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:nomor });
        console.log(shot.val())
      });
      this.setState({ tasks, tasksLoading: false });
    });
    document.addEventListener("scroll", () => {
      console.log("============LOAD MORE==============="+this.state.items+" ========= "+this.state.jumlah)
      if(this.state.items <= this.state.jumlah){
        console.log("ini di if "+(window.innerHeight + window.scrollY) +" ,,,,,"+document.body.offsetHeight)
        if ((window.innerHeight + (window.scrollY+1)) >= document.body.offsetHeight) {
            this.loadMore();
        }
      }
    });
  }

  loadMore() {
    console.log("====INI Di Load More====="+this.state.items)
    
    let number = (this.state.items+10);
    this.setState({items:number, loading: true})
    RefPengajuan.limitToFirst(number).orderByChild("idpenerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      let no = 1;
      snap.forEach(shot => {
        tasks.push({...shot.val(), key:shot.key, nomer:no})
        no++;
      })
      this.setState({ tasks, tasksLoading: false, loading:false });
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
          return ls.nama.indexOf(this.state.search)!==-1;
        }
      ),['ordertime'],['asc']
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
                        <th scope="col">Nama Warga</th>
                        <th scope="col">No Telphone</th>
                        <th scope="col">Kebutuhan</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
		        {orderedTasks.map(task => (
		            <ListPengajuanBaru key={task.key} task={task} />
              ))}
              {this.state.loading
                            ? <p className="App-intro">
                                loading ...
                                </p>
                            : ""}
           </tbody>
        </table>
        </div>
      );
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada Data Pengajuan</div>;
    }

    return taskList;
  }
}
