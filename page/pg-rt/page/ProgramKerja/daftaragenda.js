import React from 'react';
import orderBy from 'lodash/orderBy';
import ListAgenda from './listagenda';
import { rootRef, RefProgram } from './../../../../db';
export default class daftaragenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taks: [],
      taksLoading: true,
      search:'',
      judul:'', 
      jumlah:0
  }
};

  componentDidMount() {
    let no = 0;
    RefProgram.orderByChild("no_rt").equalTo(localStorage.getItem("idrt")).on('value', snap => {
      snap.forEach(shot => {
        no++      
      })
    })
    RefProgram.orderByChild("no_rt").equalTo(localStorage.getItem("idrt")).on('value', snap => {
      const taks = [];
      snap.forEach(shot => {
        taks.push({ ...shot.val(), key:shot.key, jumlah:no--})
      })
      this.setState({taks, taksLoading:false})
    })
  }

  handleFilter = event => {
        this.setState({ search: event.target.value });
  };

  render() {
    const { taks, taksLoading,search } = this.state;
    const orderedTaks = orderBy(
      taks.filter(
        (ls) => {
          return ls.judul.indexOf(this.state.search)!==-1;
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
        <div className='row col-md-12' style={{ marginBottom: 1 +'em'}}>
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
                        <th scope="col">Program Kerja</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTaks.map(task => (
            <ListAgenda key={task.key} task={task} />
          ))}
        </tbody>
        </table>
        </div>
      );
    } else {
      taskList = <div className="TaskList-empty">Tidak Ada Program Kerja</div>;
    }

    return taskList;
  }
}
