import React from 'react';
import orderBy from 'lodash/orderBy';
import Listwarga from './listwarga';
import ListRW from './../DataRW/selectrw/listitemrw';
import ListRT from './../DataRW/selectrw/listitemrt';
import Workbook from 'react-excel-workbook'
import { RefWarga, RefRW, RefKK, RefRT } from './../../../../db';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class daftarwarga extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [], tasksLoading: true, pilihanutama:'', subpilihan:'', linkdown:'', showbtn:false, teksdetail:'', jmldata:0,
    arrayrw:[], tmprw:'', tmprt:'', arrayrt:[], judulexcel:'',items: 10,
    jumlah:0, loading:false };
  }

  componentDidMount() {
    RefWarga.on('value', snap => {
      let no = 1;
        snap.forEach(shot => {
          no++;
        })
        this.setState({ jumlah:no });
    });
    RefWarga.limitToFirst(this.state.items).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer: no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
    document.addEventListener("scroll", () => {
      console.log("============LOAD MORE==============="+this.state.items+" ========= "+this.state.jumlah)
      if(this.state.items <= this.state.jumlah){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.loadMore();
        }
      }
  });
  }
  loadMore() {
    console.log("====INI Di Load More====="+this.state.items)
    
    let number = (this.state.items+10);
    this.setState({items:number, loading: true})
    RefWarga.limitToFirst(number).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer: no });
      });
      this.setState({ tasks, tasksLoading: false, loading:false });
    });
  }
  pilihrw(){
    RefRW.on('value', snap => {
      const arrayrw = [];
      snap.forEach(shot => {
        arrayrw.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ arrayrw });
    });
  }
  pilihrt(){
    RefRT.on('value', snap => {
      const arrayrt = [];
      snap.forEach(shot => {
        arrayrt.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ arrayrt });
    });
  }
  hapusfilter = () => {
    this.setState({ pilihanutama:'', subpilihan:'', showbtn:false});
    // RefWarga.on('value', snap => {
    //   const tasks = [];
    //   let no = 0;
    //   snap.forEach(shot => {
    //     no++;
    //     tasks.push({ ...shot.val(), key: shot.key, nomer: no });
    //   });
    //   this.setState({ tasks, tasksLoading: false });
    // });
    RefWarga.limitToFirst(this.state.items).on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer: no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }
  pencarian(dari, isi){
    try{
      RefWarga.orderByChild(dari).equalTo(isi).on('value', snap => {
        const tasks = [];
        let no = 0;
        snap.forEach(shot => {
          no++;
          tasks.push({ ...shot.val(), key: shot.key, nomer: no });
        });
        this.setState({ tasks, tasksLoading: false, jmldata: no });
      });
    }catch(error){

    }
  }
  tampildata=()=>{
   
      // RefWarga.on('value', snap => {
      //   const tasks = [];
      //   let no = 0;
      //   snap.forEach(shot => {
      //     no++;
      //     tasks.push({ ...shot.val(), key: shot.key, nomer: no });
      //   });
      //   this.setState({ tasks, tasksLoading: false, jmldata: no });
      // });
      RefWarga.limitToFirst(this.state.items).on('value', snap => {
        const tasks = [];
        let no = 0;
        snap.forEach(shot => {
          no++;
          tasks.push({ ...shot.val(), key: shot.key, nomer: no });
        });
        this.setState({ tasks, tasksLoading: false,jmldata: no });
      });
    
  }
  handleChangePilihan = event =>{
    if(event.target.value === "norw" || event.target.value === "RT"){
      this.pilihrw();
    }
    this.tampildata();
    this.setState({pilihanutama: event.target.value, subpilihan:'', showbtn:false});
 
  }
  handleChangeRW = event => {
    this.setState({tmprw: event.target.value});
    RefRT.orderByChild("norw").equalTo(event.target.value).on('value', snap => {
      const arrayrt = [];
      snap.forEach(shot => {
        arrayrt.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ arrayrt });
    });
  }
  handleChangeSub = event =>{
    const { pilihanutama, tasks, tmprw } = this.state;
    //console.log("pjgnya-", event.target.value.length)
    if(event.target.value.length === 0){
      this.tampildata();
      //console.log("kosong")
      // this.tampildata();
      this.setState({subpilihan: event.target.value, showbtn:false, judulexcel:"Data Warga Berdasakan "+pilihanutama+" dengan nilai "+event.target.value+".xlsx", teksdetail:"Menampilkan data berdasarkan <b>"+ pilihanutama + "</b> dengan nilai <b>"+ event.target.value+"</b>", linkdown:"http://wargaku.id/exportdatawarga/pilihan="+pilihanutama+"&nilai="+event.target.value});
      
      
    }else{
      if(pilihanutama === "usia"){
        try{
          var tdy = new Date();
          var ageCalculator = require('age-calculator');
          let {AgeFromDateString, AgeFromDate} = require('age-calculator');
          RefWarga.on('value', snap => {
            const tasks = [];
            let no = 0, tgl="";
            snap.forEach(shot => {
              tgl = shot.val().tgl_lahir;
              var pecah = tgl.split("-");
              let ageFromDate = new AgeFromDate(new Date(pecah[0], (pecah[1]-1), pecah[2])).age;
              // console.log("value from AgeFromDate", ageFromDate);
              // console.log(pecah[1])
              if(ageFromDate == event.target.value){
              no++;
              tasks.push({ ...shot.val(), key: shot.key, nomer: no });
              }
            });
            this.setState({ tasks, tasksLoading: false, jmldata: no });
          });
          this.setState({subpilihan: event.target.value, showbtn:true, judulexcel:"Data Warga Berdasakan "+pilihanutama+" dengan nilai "+event.target.value+".xlsx", teksdetail:"Menampilkan data berdasarkan <b>"+ pilihanutama + "</b> dengan nilai <b>"+ event.target.value+"</b>", linkdown:"http://wargaku.id/exportdatawarga/pilihan="+pilihanutama+"&nilai="+event.target.value});
        }catch(error){
          console.log(error)
        }
      }else if(pilihanutama === "RT"){
        try{
      
          RefWarga.orderByChild("norw").equalTo(tmprw).on('value', snap => {
            const tasks = [];
            let no = 0;
            snap.forEach(shot => {
              if(shot.val().nort === event.target.value){
              no++;
              tasks.push({ ...shot.val(), key: shot.key, nomer: no });
              }
            });
            this.setState({ tasks, tasksLoading: false, jmldata: no });
          });
        
     
          this.setState({subpilihan: event.target.value, showbtn:true, judulexcel:"Data Warga Berdasakan "+pilihanutama+" dengan nilai "+event.target.value+".xlsx", teksdetail:"Menampilkan data warga berdasarkan <b>RW "+ tmprw + " RT "+ event.target.value+"</b>", linkdown:"http://wargaku.id/exportdatawarga/pilihan="+pilihanutama+"&nilairt="+event.target.value+"&nilairw="+tmprw});
        }catch(error){
    
        }
      }else if(pilihanutama != "nama" && pilihanutama != "email" && pilihanutama != "pekerjaan" && pilihanutama != "nik" && pilihanutama != "no_kk" && pilihanutama != "tempatlahir"){  
        this.pencarian(pilihanutama, event.target.value);
        //console.log("bukan")
        this.setState({subpilihan: event.target.value, showbtn:true, judulexcel:"Data Warga Berdasakan "+pilihanutama+" dengan nilai "+event.target.value+".xlsx", teksdetail:"Menampilkan data berdasarkan <b>"+ pilihanutama + "</b> dengan nilai <b>"+ event.target.value+"</b>", linkdown:"http://wargaku.id/exportdatawarga/pilihan="+pilihanutama+"&nilai="+event.target.value});
      }else{  
        //console.log("yes")
      //this.pencarian(pilihanutama, event.target.value);
      this.setState({subpilihan: event.target.value, showbtn:true, judulexcel:"Data Warga Berdasakan "+pilihanutama+" dengan nilai "+event.target.value+".xlsx", teksdetail:"Menampilkan data berdasarkan <b>"+ pilihanutama + "</b> dengan nilai <b>"+ event.target.value+"</b>", linkdown:"http://wargaku.id/exportdatawarga/pilihan="+pilihanutama+"&nilai="+event.target.value});
      }
    }
    //if(pilihanutama === "gender" || pilihanutama === "status_nikah" || pilihanutama === "status" || pilihanutama === "agama" || pilihanutama === "pendidikan" || pilihanutama === "pekerjaan" || pilihanutama === "kewarganegaraan" || pilihanutama === "tipewarga"){
    
    //}
  }
  exportdata(){

  }
  render() {
    const { tasks, tasksLoading, pilihanutama, showbtn,  arrayrw, arrayrt, judulexcel, subpilihan } = this.state;
    
    let taskList, keyword, tampilbtn, hapusfilter, keywordrt;
    let orderedTasks;
    if(showbtn){

      if(pilihanutama === "nama"){
        orderedTasks = orderBy(
          tasks.filter(
            (ls) => {
              return ls.nama.indexOf(subpilihan)!==-1;
            }
          ),
        );
      }else if(pilihanutama === "pekerjaan"){
        orderedTasks = orderBy(
          tasks.filter(
            (ls) => {
              return ls.pekerjaan.indexOf(subpilihan)!==-1;
            }
          ),
        );
      }else if(pilihanutama === "nik"){
        orderedTasks = orderBy(
          tasks.filter(
            (ls) => {
              return ls.nik.indexOf(subpilihan)!==-1;
            }
          ),
        );
      }else if(pilihanutama === "email"){
        orderedTasks = orderBy(
          tasks.filter(
            (ls) => {
              return ls.email.indexOf(subpilihan)!==-1;
            }
          ),
        );
      }else if(pilihanutama === "tempatlahir"){
        orderedTasks = orderBy(
          tasks.filter(
            (ls) => {
              return ls.tempatlahir.indexOf(subpilihan)!==-1;
            }
          ),
        );
      }else if(pilihanutama === "no_kk"){
        orderedTasks = orderBy(
          tasks.filter(
            (ls) => {
              return ls.no_kk.indexOf(subpilihan)!==-1;
            }
          ),
        );
      }else{
        orderedTasks = orderBy(
          tasks
        );
      }

      tampilbtn = (
        <div className="row">
        <div className="form-group col-md-12">
            <p>Detail : {ReactHtmlParser(this.state.teksdetail)} Jumlah Data : <b>{orderedTasks.length}</b></p>
        </div>
    </div>
      )
      hapusfilter = (
        <div className="col-md-2">
          <div className="col-md-6">
            <label>Opsi</label>
            </div>
          <div className="col-md-6 row">
          <div className="col-md-6">
            {/* <a target="_blank" href={linkdown}> */}
            
            <Workbook filename={judulexcel} element={<button className="btn btn-primary"  title="Export Data"><i className="fa fa-file-excel-o"></i></button>}>
            <Workbook.Sheet data={tasks} name="Data Warga">
              <Workbook.Column label="No" value="nomer"/>
              <Workbook.Column label="Nama" value="nama"/>
              <Workbook.Column label="NIK" value="nik"/>
              <Workbook.Column label="Nokk" value="no_kk"/>
              <Workbook.Column label="RW" value="norw"/>
              <Workbook.Column label="RT" value="nort"/>
              <Workbook.Column label="Jenis Kelamin" value="gender"/>
              <Workbook.Column label="Agama" value="agama"/>
              <Workbook.Column label="Email" value="email"/>
              <Workbook.Column label="No HP" value="nohp"/>
              <Workbook.Column label="Tempat Lahir" value="tempatlahir"/>
              <Workbook.Column label="Tanggal Lahir" value="tgl_lahir"/>
              <Workbook.Column label="Nama Ayah" value="namaayah"/>
              <Workbook.Column label="Nama Ibu" value="namaibu"/>
              <Workbook.Column label="Pekerjaan" value="pekerjaan"/>
              <Workbook.Column label="Pendidikan" value="pendidikan"/>
              <Workbook.Column label="Kewarganegaraan" value="kewarganegaraan"/>
              <Workbook.Column label="Status Nikah" value="status_nikah"/>
              <Workbook.Column label="Tipe Warga" value="tipewarga"/>
              <Workbook.Column label="No Wa" value="wa"/>
              <Workbook.Column label="FB" value="fb"/>
              <Workbook.Column label="Twitter" value="twitter"/>
              <Workbook.Column label="IG" value="ig"/>
            </Workbook.Sheet>
            </Workbook>
              
            {/* </a> */}
            </div>
          <div className="col-md-6">
            <button className="btn btn-danger" onClick={this.hapusfilter} title="Hapus Filter"><i className="fa fa-times"></i></button>
            </div>
            </div>
        </div>
      )
      
    
    }else{
      orderedTasks = orderBy(
        tasks
      );
    }
    if(pilihanutama === "nama"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
            <label>Nama Warga</label>

            <input type="text"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            className="form-control" placeholder="Masukkan Nama"/>
           </div>
    </div>
      )
    }else if(pilihanutama === "usia"){
      keyword = (
        
        <div className="col-md-3">
        <div className="form-group col-md-12">
            <label>Usia</label>

            <input type="number"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            className="form-control" placeholder="Masukkan Usia (Tahun)"/>
        
    </div>
    </div>
      )
    }else if(pilihanutama === "pendidikan"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
            <label>Pendidikan</label>

             <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
                <option value="">Pilih Pendidikan</option>
                <option value="TIDAK / BELUM SEKOLAH">TIDAK / BELUM SEKOLAH</option>
                <option value="BELUM TAMAT SD/SEDERAJAT">BELUM TAMAT SD/SEDERAJAT</option>
                <option value="TAMAT SD / SEDERAJAT">TAMAT SD / SEDERAJAT</option>
                <option value="SLTP/SEDERAJAT">SLTP/SEDERAJAT</option>
                <option value="SLTA / SEDERAJAT">SLTA / SEDERAJAT</option>
                <option value="DIPLOMA I / II">DIPLOMA I / II</option>
                <option value="AKADEMI/ DIPLOMA III/S. MUDA	">AKADEMI/ DIPLOMA III/S. MUDA	</option>
                <option value="DIPLOMA IV/ STRATA I">DIPLOMA IV/ STRATA I</option>
                <option value="STRATA II">STRATA II</option>
                <option value="STRATA III">STRATA III</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "pekerjaan"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
            <label>Pekerjaan</label>

            <input type="text"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            className="form-control" placeholder="Masukkan Pekerjaan"/>
           </div>
    </div>
      )
    }else if(pilihanutama === "email"){
      keyword = (
        
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Email</label>

            <input type="text"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            
            className="form-control" placeholder="Masukkan Email"/>
    </div>
    </div>
      )
    }else if(pilihanutama === "nik"){
      keyword = (
        
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>NIK</label>

            <input type="number"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            className="form-control" placeholder="Masukkan NIK"/>
    </div>
    </div>
      )
    }else if(pilihanutama === "tempatlahir"){
      keyword = (
        
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Tempat Lahir</label>

            <input type="text"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            
            className="form-control" placeholder="Masukkan Tampat Lahir"/>
    </div>
    </div>
      )
    }else if(pilihanutama === "no_kk"){
      keyword = (
        
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>No KK</label>

            <input type="number"
            onChange={this.handleChangeSub}
            value={this.state.subpilihan}
            className="form-control" placeholder="Masukkan No KK"/>
    </div>
    </div>
      )
    }else if(pilihanutama === "status_nikah"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
          <label>Status Pernikahan </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
                <option value="">Pilih Status Pernikahan</option>
                <option value="Sudah Menikah">Sudah Menikah</option>
                <option value="Belum Menikah">Belum Menikah</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "kewarganegaraan"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Kewarganegaraan </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
                <option value="">Pilih Kewarganegaraan</option>
                <option value="WNI">WNI</option>
                <option value="WNA">WNA</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "tipewarga"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Tipe Warga </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
                <option value="">Pilih Tipe Warga</option>
                <option value="Asli">Asli</option>
                <option value="Tambahan">Tambahan</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "agama"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Agama </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
               
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Hindu">Hindu</option>
                <option value="Budha">Budha</option>
                <option value="Konghuchu">Konghuchu</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "status"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Status Keluarga </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
               
                <option value="">Pilih Status Keluarga</option>
                <option value="Kepala Keluarga">Kepala Keluarga</option>
                <option value="Ayah">Ayah</option>
                <option value="Istri">Istri</option>
                <option value="Anak">Anak</option>
                <option value="Kakek">Kakek</option>
                <option value="Nenek">Nenek</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "gender"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>Jenis Kelamin </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "norw"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>RW </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
            <option value="">Pilih RW</option>
              {arrayrw.map(task => (
                <ListRW key={task.key} task={task} />
              ))}
            </select>
        </div>
    </div>
      )
    }else if(pilihanutama === "RT"){
      keyword = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>RW </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.tmprw} onChange={this.handleChangeRW}>
            <option value="">Pilih RW</option>
              {arrayrw.map(task => (
                <ListRW key={task.key} task={task} />
              ))}
            </select>
        </div>
    </div>
      )

      keywordrt = (
        <div className="col-md-3">
        <div className="form-group col-md-12">
        <label>RT </label>
            <select className="form-control" style={{height: 3 + 'em'}} value={this.state.subpilihan} onChange={this.handleChangeSub}>
            <option value="">Pilih RT</option>
              {arrayrt.map(task => (
                <ListRT key={task.key} task={task} />
              ))}
            </select>
        </div>
    </div>
      )
    }
    if (tasksLoading) {
      taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
      <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>;
    } else if (tasks.length) {
      taskList = (
        
        <div className="card-body">

        <div className="row">
            <div className="col-md-3">
                <div className="form-group col-md-12">
                    <label>Filter Berdasarkan</label>
                    <select className="form-control" style={{height: 3 + 'em'}} value={this.state.pilihanutama} onChange={this.handleChangePilihan}>
                        <option value="">Filter Berdasarkan</option>
                        <option value="nama">Nama</option>
                        <option value="usia">Usia</option>
                        <option value="gender">Jenis Kelamin</option>
                        <option value="status">Status Keluarga</option>
                        <option value="pendidikan">Pendidikan</option>
                        <option value="nik">NIK</option>
                        <option value="no_kk">No KK</option>
                        <option value="status_nikah">Status Pernikahan</option>
                        <option value="email">Email</option>
                        <option value="tipewarga">Tipe Warga</option>
                        <option value="pekerjaan">Pekerjaan</option>
                        <option value="kewarganegaraan">Kewarganegaraan</option>
                        <option value="agama">Agama</option>
                        <option value="tempatlahir">Tempat Lahir</option>
                        <option value="norw">RW</option>
                        <option value="RT">RT</option>
                    </select>
                </div>
            </div>

            {keyword}
            {keywordrt}
            {hapusfilter}
          </div>
          {tampilbtn}
          <div className="table-responsive">
            <table className="table">
                <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama Warga</th>
                            <th scope="col">NIK</th>
                            <th scope="col">RW/RT</th>
                            <th scope="col">Jenis Kelamin</th>
                            <th scope="col">Tipe Warga</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                  {orderedTasks.map(task => (
                    <Listwarga key={task.key} task={task} />
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
                    <select className="form-control" style={{height: 3 + 'em'}} value={this.state.pilihanutama} onChange={this.handleChangePilihan}>
                        <option value="">Filter Berdasarkan</option>
                        <option value="nama">Nama</option>
                        <option value="usia">Usia</option>
                        <option value="gender">Jenis Kelamin</option>
                        <option value="pendidikan">Pendidikan</option>
                        <option value="nik">NIK</option>
                        <option value="no_kk">No KK</option>
                        <option value="status">Status Pernikahan</option>
                        <option value="email">Email</option>
                        <option value="tipewarga">Tipe Warga</option>
                        <option value="pekerjaan">Pekerjaan</option>
                        <option value="kewarganegaraan">Kewarganegaraan</option>
                        <option value="tempatlahir">Tempat Lahir</option>
                        <option value="RW">RW</option>
                        <option value="RT">RT</option>
                    </select>
                </div>
            </div>

            {keyword}
            {keywordrt}
            {hapusfilter}
          </div>
          {tampilbtn}
      <div className="TaskList-empty">Tidak Ada Data Warga</div>
      </div>
    );
    }

    return taskList;
  }
}
