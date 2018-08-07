import React from 'react';
import orderBy from 'lodash/orderBy';
import ListGaleri from './listQurban';
import { rootRef, RefQurban } from './../../../../db';
export default class DaftarGaleri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taks: [],
      taksLoading: true,
      tasks:[],
      search:'',
      judul:'', 
      gridnumber:0,
      contentDisplay:false,
      items: 10,
      jumlah:0,
      loading:false
  }
};

  componentDidMount() {

    RefQurban.on("value", snap =>{
      let no = 1;
      snap.forEach(shot => {
        no++;
      })
      this.setState({ jumlah:++no });
    })
    
    RefQurban.limitToFirst(this.state.items).on("value", snap =>{
      let no = 0;
      const taks = [];
      snap.forEach(shot => {
        no++;
        taks.push({ ...shot.val(), key:shot.key, no:no})
      })
      this.setState({ taks, taksLoading:false  });
    })

  
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
    RefQurban.limitToFirst(number).on('value', snap => {
      const taks = [];
      let no = 1;
      snap.forEach(shot => {
        taks.push({...shot.val(), key:shot.key, no:no})
        no++;
      })
      this.setState({ taks, tasksLoading: false, loading:false });
    });
  }

  handleFilter = event => {
        this.setState({ search: event.target.value });
  };

  render() {
    const { taks, taksLoading,search } = this.state;
    const orderedTaks = orderBy(
      taks.filter(
        (ls) => {
          return ls.nama.indexOf(this.state.search)!==-1 || ls.status.indexOf(this.state.search)!==-1;
        }
      ), ['ordertime'], ['desc']
    );

    let taskList;
    if (taksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (taks.length) {
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
                        <th scope="col">Jenis Hewan</th>
                        <th scope="col">Pembayaran</th>
                        <th scope="col">Status</th>
                        <th scope="col">Request</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTaks.map(task => (
            <ListGaleri key={task.key} task={task} />
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
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Foto</div>;
    }

    return taskList;
  }
}
