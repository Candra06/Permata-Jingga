import "./../../../../asset/plugins/datatables/jquery.dataTables.css";
import React, {Component} from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listwarga';
import { RefWarga, RefKK } from './../../../../db';
import {BootstrapTable, TableHeaderColumn, BootstrapButton} from 'react-bootstrap-table';
import '../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {  Pagination } from 'react-bootstrap';
export default class daftarwarga extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        tasks: [],
        filterGndr:'',
        search:'',
        tasksLoading: true,
        items: 10,
        loadingState: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
       this.setState({
         currentPage: Number(event.target.id)
       });
     }
  componentDidMount() {
    var self = this;
    RefWarga.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }
  handleFilter = event => {
        this.setState({ search: event.target.value });
        console.log(event.target.value);
  };
  button = event => {
    return (
      <input type="button" value="edit"/>
    )
  }
  render() {
    const { tasks,tasksLoading, search  } = this.state;
    const orderedTasks = orderBy(
      tasks
    );
    const list = [];
    let data = tasks.filter(
      (ls) => {
        return ls.nama.indexOf(this.state.search)!==-1;
      }
    );
    {orderedTasks.map(task => (
        list.push({no_kk:task.no_kk, nama:task.nama, nik:task.nik, jenis_kelamin:task.gender, aksi:(this.button)})
      ))}
    let taskList;
    if (tasksLoading) {
        taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      }else if (tasks.length) {
      taskList = (
        <div className="table-responsive" ref="iScroll"
        style={{ height: "420px", overflow: "auto" }}>
          <div>
          {/*
            <BootstrapTable data={list} version='4' pagination search exportCSV striped >
                <TableHeaderColumn isKey dataField='no_kk'>No KK</TableHeaderColumn>
                <TableHeaderColumn dataField='nama'>Nama</TableHeaderColumn>
                <TableHeaderColumn dataField='nik'>nik</TableHeaderColumn>
                <TableHeaderColumn dataField='jenis_kelamin'>jenis kelamin</TableHeaderColumn>
                <TableHeaderColumn dataField='aksi'>Generate Group Page</TableHeaderColumn>
            </BootstrapTable>
          */}
          <div className='col-md-4 right'>
            <input type='text' className='form-control' placeholder='cari data dengan nama' value={search} onChange={this.handleFilter}/>
          </div>
          <table className='table table-striped table-hovered'>
            <thead>
              <tr>
                <th>No KK</th><th>Nama</th><th>nik</th><th>jenis kelamin</th><th>aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map(task => {
                    <Listwarga key={task.key} task={task} />
              })}
            </tbody>
          </table>
          <ul id="page-numbers">

            </ul>
          </div>
        </div>
      );
    }else{
      taskList = <div className="TaskList-empty">Tidak Ada Data Warga</div>;
    }

    return taskList;
  }
}
