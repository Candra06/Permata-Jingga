import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listpemasukan';
import { Refpemasukan } from './../../../../db';
import Listbln from "./../DataIuran/listitembulan";
import Workbook from 'react-excel-workbook'
export default class daftarpemasukan extends React.Component {
  state = {
    tasks: [], tasksLoading: true,search:'',judul:'', pilihan:'', subpilihan:'', arraypilihanbulan:[], showbtn:false,
    judulexcel:'',
    gridnumber:0,
    contentDisplay:false,
    items: 10,
    jumlah:0,
    loading:false
  };

  componentDidMount() {
    this.tampildata('semua');
    this.pilihbulan();
  }

  tampildata= (xtipe)=>{
      let jmldata=0;
      Refpemasukan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
        
        snap.forEach(shot => {
          jmldata++
        });
        this.setState({ jumlah:jmldata });
      });
    if(xtipe === "semua"){
      Refpemasukan.limitToFirst(this.state.items).orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
        const tasks = [];
        let no = 0;
        snap.forEach(shot => {
          no++
          tasks.push({ ...shot.val(), key: shot.key, nomer: no });
          
        });
        this.setState({ tasks, tasksLoading: false });
      });

      document.addEventListener("scroll", () => {
        if(this.state.items <= this.state.jumlah){
          if ((window.innerHeight + (window.scrollY+1)) >= document.body.offsetHeight) {
              this.loadMore('semua');
          }
        }
      });

    }else{
      Refpemasukan.limitToFirst(this.state.items).orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
        const tasks = [];
        let no = 0;
        snap.forEach(shot => {
          if(shot.val().jumlah_uang === xtipe){
            no++
              tasks.push({ ...shot.val(), key: shot.key, nomer: no });
          }
        });
        this.setState({ tasks, tasksLoading: false });
      });
      
      document.addEventListener("scroll", () => {
        if(this.state.items <= this.state.jumlah){
          if ((window.innerHeight + (window.scrollY+1)) >= document.body.offsetHeight) {
              this.loadMore(xtipe);
          }
        }
      });
    }
    //console.log(localStorage.getItem("nik"));
    
  }

  loadMore=(xtipe)=> {
    
    let number = (this.state.items+10);
    this.setState({items:number, loading: true})
    if(xtipe === "semua"){
      Refpemasukan.limitToFirst(number).orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
        const tasks = [];
        let no = 0;
        snap.forEach(shot => {
          no++
          tasks.push({ ...shot.val(), key: shot.key, nomer: no });
          
        });
        this.setState({ tasks, tasksLoading: false });
      });

      document.addEventListener("scroll", () => {
        if(this.state.items <= this.state.jumlah){
          if ((window.innerHeight + (window.scrollY+1)) >= document.body.offsetHeight) {
              this.loadMore('semua');
          }
        }
      });

    }else{
      Refpemasukan.limitToFirst(number).orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
        const tasks = [];
        let no = 0;
        snap.forEach(shot => {
          if(shot.val().jumlah_uang === xtipe){
            no++
              tasks.push({ ...shot.val(), key: shot.key, nomer: no });
          }
        });
        this.setState({ tasks, tasksLoading: false });
      });
      
      document.addEventListener("scroll", () => {
        if(this.state.items <= this.state.jumlah){
          if ((window.innerHeight + (window.scrollY+1)) >= document.body.offsetHeight) {
              this.loadMore(xtipe);
          }
        }
      });
    }
  }
  pilihbulan = () => {
    let tdy = new Date();
    let xtgl=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'], arraypilihanbulan=[];
   
    for (let i = 0; i < 12; i++) {
        let bln = xtgl[i]+"-"+tdy.getFullYear();
        arraypilihanbulan.push({bulan:bln})
    }
    //console.log(arraypilihanbulan)
    this.setState({
        arraypilihanbulan
    })
}

  handleChangePilihan = event => {
        this.setState({ pilihan: event.target.value, subpilihan:'' });
        this.tampildata('semua');
  };

  handleChangeSubPilihan = event => {
    if(event.target.value.length === 0){
      this.tampildata('semua');
      this.setState({ subpilihan: event.target.value, showbtn: false }) 
    }else{
    this.setState({ subpilihan: event.target.value, showbtn:true, judulexcel:'Data Pemasukan Berdasarkan '+ this.state.pilihan + ' Dengan nilai ' + event.target.value});
    if(this.state.pilihan === "jumlah_uang"){
      this.tampildata(event.target.value);
    }
  }
  };

  hapusfilter=()=>{
    this.tampildata('semua');
    this.setState({
      pilihan:'',
      subpilihan:'',
      showbtn: false
    })
  }
  render() {
    const { tasks, tasksLoading, pilihan, subpilihan, arraypilihanbulan, showbtn, judulexcel } = this.state;
    let orderedTasks, keyword, hapusfilter; 
    if(showbtn){
      hapusfilter = (
        <div className="col-md-3">
          <div className="col-md-3">
            <label>Opsi</label>
          </div>
          <div className="col-md-6 row">
          <div className="col-md-3" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em'}}>
            
            <Workbook filename={judulexcel+'.xlsx'} element={<button className="btn btn-primary"  title="Export Data"><i className="fa fa-file-excel-o"></i></button>}>
            <Workbook.Sheet data={tasks} name="Data Pemasukan">
              <Workbook.Column label="Nama" value="nama_pembuat"/>
              <Workbook.Column label="Jumlah Uang" value="jumlah_uang"/>
              <Workbook.Column label="Asal Dana" value="asaldana"/>
              <Workbook.Column label="Tanggal" value="tanggal"/>
              <Workbook.Column label="Keterangan" value="keterangan"/>
            </Workbook.Sheet>
            </Workbook>
              
            </div>
          <div className="col-md-3" style={{ marginBottom: 0.7+'em', marginRight:0.5+'em'}}>
            <button className="btn btn-danger" onClick={this.hapusfilter} title="Hapus Filter"><i className="fa fa-times"></i></button>
            </div>
            </div>
        </div>
      )
    }
    if(pilihan === "perbulan"){
      orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.datachart.indexOf(subpilihan)!==-1;
          }
        ), ['ordertime'], ['asc']
      );

      keyword = (
        <div className="col-md-3">
            <div className="form-group col-md-12">
                <label>Bulan Iuran <sup>*</sup></label>
                <select className="form-control" style={{height: 2.5 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSubPilihan}>
                    <option value="">Pilih Bulan</option>
                    {arraypilihanbulan.map(task => (
                        <Listbln key={task.key} task={task} />
                    ))}
                </select>
            </div>
        </div>
      )
      
    }else if(pilihan === "jumlah_uang"){
      orderedTasks = orderBy(
        tasks, ['ordertime'], ['asc']
      );
      keyword = (
        <div className="col-md-3">
            <div className="form-group col-md-12">
                <label>Jumlah Uang</label>

                <input type="number"
                onChange={this.handleChangeSubPilihan}
                value={this.state.subpilihan}
                className="form-control" placeholder="Masukkan Jumlah Uang"/>
              </div>
        </div>
      )

      
    }else if(pilihan === "nama_pembuat"){
      orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.nama_pembuat.indexOf(subpilihan)!==-1;
          }
        ), ['ordertime'], ['asc']
      );

      keyword = (
        <div className="col-md-3">
            <div className="form-group col-md-12">
                <label>Nama Pembuat</label>

                <input type="text"
                onChange={this.handleChangeSubPilihan}
                value={this.state.subpilihan}
                className="form-control" placeholder="Masukkan Nama Pembuat"/>
              </div>
        </div>
      )

      
    }else if(pilihan === "asal_dana"){
      orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.asaldana.indexOf(subpilihan)!==-1;
          }
        ), ['ordertime'], ['asc']
      );

      keyword = (
        <div className="col-md-3">
            <div className="form-group col-md-12">
                <label>Asal Dana</label>

                <input type="text"
                onChange={this.handleChangeSubPilihan}
                value={this.state.subpilihan}
                className="form-control" placeholder="Masukkan Asal Dana"/>
              </div>
        </div>
      )

      
    }else if(pilihan === "keterangan"){
      orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.keterangan.indexOf(subpilihan)!==-1;
          }
        ), ['ordertime'], ['asc']
      );

      keyword = (
        <div className="col-md-3">
            <div className="form-group col-md-12">
                <label>Keterangan</label>

                <input type="text"
                onChange={this.handleChangeSubPilihan}
                value={this.state.subpilihan}
                className="form-control" placeholder="Masukkan Keterangan"/>
              </div>
        </div>
      )

      
    }else if(pilihan === "tanggal"){
      orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.tanggal.indexOf(subpilihan)!==-1;
          }
        ), ['ordertime'], ['asc']
      );

      keyword = (
        <div className="col-md-3">
            <div className="form-group col-md-12">
                <label>Tanggal</label>

                <input type="date"
                onChange={this.handleChangeSubPilihan}
                value={this.state.subpilihan}
                className="form-control"/>
              </div>
        </div>
      )

      
    }else{
      orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.keterangan.indexOf(subpilihan)!==-1 || ls.asaldana.indexOf(subpilihan)!==-1 || ls.tanggal.indexOf(subpilihan)!==-1 || ls.jumlah_uang.indexOf(subpilihan)!==-1 || ls.nama_pembuat.indexOf(subpilihan)!==-1;
          }
        ), ['ordertime'], ['asc']
      );
    }
 
   

    let taskList;
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (orderedTasks.length) {
      taskList = (
        <div className="card-body">

        <div className="row">
            <div className="col-md-3">
                <div className="form-group col-md-12">
                    <label>Filter Berdasarkan</label>
                    <select className="form-control" style={{height: 2.5 + 'em'}} value={this.state.pilihan} onChange={this.handleChangePilihan}>
                        <option value="">Filter Berdasarkan</option>
                        <option value="perbulan">Perbulan</option>
                        <option value="nama_pembuat">Nama Pembuat</option>
                        <option value="jumlah_uang">Jumlah Uang</option>
                        <option value="asal_dana">Asal Dana</option>
                        <option value="tanggal">Tanggal Pemasukan</option>
                        <option value="keterangan">Keterangan</option>
                    </select>
                </div>
            </div>

            {keyword}
            {hapusfilter} 
          </div>
          {/* {tampilbtn} */}
        <div className="table-responsive">
          <table className="table">
              <thead>
                      <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama Pembuat</th>
                          <th scope="col">Jumlah Uang</th>
                          <th scope="col">Asal Dana</th>
                          <th scope="col">Tanggal</th>
                          <th scope="col">Keterangan</th>
                          <th scope="col">Aksi</th>
                      </tr>
                  </thead>
                  <tbody>
            {orderedTasks.map(task => (
              <Listkk key={task.key} task={task} />
            ))}

            {this.state.loading
              ? <p className="App-intro">
                  loading ...
                  </p>
              : ""}
          </tbody>
          </table>
        </div>
      </div>
      );
    } else {
      taskList = (
        <div className="card-body">

        <div className="row">
          <div className="col-md-3">
              <div className="form-group col-md-12">
                  <label>Filter Berdasarkan</label>
                  <select className="form-control" style={{height: 2.5 + 'em'}} value={this.state.pilihan} onChange={this.handleChangePilihan}>
                      <option value="">Filter Berdasarkan</option>
                      <option value="perbulan">Perbulan</option>
                      <option value="nama_pembuat">Nama Pembuat</option>
                      <option value="jumlah_uang">Jumlah Uang</option>
                      <option value="asal_dana">Asal Dana</option>
                      <option value="tanggal">Tanggal Pemasukan</option>
                      <option value="keterangan">Keterangan</option>
                  </select>
              </div>
          </div>
            {keyword}
        </div>
          <div className="TaskList-empty">Tidak Ada Data Pemasukan</div>
      </div>);
    }

    return taskList;
  }
}
