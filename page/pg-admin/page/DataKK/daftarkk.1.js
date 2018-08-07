import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listkk';
import { RefKK, RefWarga } from './../../../../db';
import {Action} from "./../../../../Action";
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone'
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};
export default class daftarkk extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: [], tasksLoading:true, search: '', modal: false,files:'',
      data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: []
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }
  componentDidMount() {
    console.log(this.state.data)
    RefKK.on('value', snap => {
      const tasks = [];
      let no = 0;
      snap.forEach(shot => {
        no++;
        tasks.push({ ...shot.val(), key: shot.key, nomer:no });
      });
      this.setState({ tasks, tasksLoading: false });
    });
  }

  suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
	onDrop(evt) { evt.stopPropagation(); evt.preventDefault();
		const files = evt.dataTransfer.files;
    console.log(files[0])
    const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			/* Update state */
      console.log("full data:"+data);
			// if(data!==null){
      //   this.setState({ cols:data,cols: make_cols(ws['!ref']) });
      // }
		};
    console.log(reader.readAsBinaryString(files[0]))
  		if(rABS) reader.readAsBinaryString(files[0]); else reader.readAsArrayBuffer(files[0]);
    // if(files && files[0]) this.handleFile(files[0]);
	};
  art(){
    alert()
  }
  handleFile(file) {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;

		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			/* Update state */
			// this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};
  handleFilter = event => {
    this.setState({ search: event.target.value });
  };
  toggle() {
      this.setState({
        modal: !this.state.modal
      });
  }
  sync(){
    RefKK.on('value', snap => {
      snap.forEach(shott => {
        RefWarga.orderByChild("no_kk").equalTo(shott.val().nokk).on("value", snap => {
          snap.forEach(shot => {
            var dt = {
              nik:shot.val().nik.trim()
            }
            Action("deleteWarga", dt).then((result) => {
                if(result!=''){
                  //console.log(result);
                    console.log("success");
                }else{
                    console.log("errors");
                }
            })
          })
        })
      });
    });
      const tasks = [];
        RefWarga.orderByChild("tipewarga").equalTo("Asli").on("value", snap => {
          snap.forEach(shot => {
            var data = {
              kd_warga:RandomKata.generate(10),
              no_kk: shot.val().no_kk.trim(),
              nama: shot.val().nama.trim(),
              nik: shot.val().nik.trim(),
              tempatlahir: shot.val().tempatlahir.trim(),
              tgl_lahir: shot.val().tgl_lahir.trim(),
              pekerjaan: shot.val().pekerjaan.trim(),
              gender: shot.val().gender.trim(),
              nohp: shot.val().nohp.trim(),
              wa: shot.val().wa.trim(),
              email: shot.val().email.trim(),
              fb: shot.val().fb.trim(),
              ig: shot.val().ig.trim(),
              twitter: shot.val().twitter.trim(),
              agama: shot.val().agama.trim(),
              pendidikan: shot.val().pendidikan.trim(),
              status_nikah: shot.val().status_nikah.trim(),
              kewarganegaraan: shot.val().kewarganegaraan.trim(),
              namaayah: shot.val().namaayah.trim(),
              namaibu: shot.val().namaibu.trim(),
              status: shot.val().status.trim(),
            }
            //console.log(data);
            Action("addWarga", data).then ((result) => {
                if(result!=''){
                    console.log("success");
                }else{
                    console.log("errors");
                }
            })
          })
        })
        toast.success('Data Berhasil Di Sinkron', {
          position: toast.POSITION.TOP_RIGHT,
      });
  }
  handleChange(file){
    const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			/* Update state */
      console.log(data);
			// this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
		// if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }
  render() {
    const { tasks, tasksLoading, search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.kepala.indexOf(this.state.search)!==-1;
        }
      ),
      ['time_notif']['desc']
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
              <button onClick={this.sync} className='btn btn-success'><i className="fa fa-refresh"></i>  Sinkronisasi Data</button>
              &nbsp;
              {/* <a target="_blank" href={"http://webbeta.wargaku.id/apps/exportdataWarga"}><button  className='btn btn-success'><i className='fa fa-file-excel-o'></i> export</button></a>
              &nbsp; */}
              <Button color="success" onClick={() => this.toggle()}>Import data</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} frame position="top">
                  <ModalHeader toggle={this.toggle}>
                    <div className="card-header">
                      <h3 className="card-title">Import Data</h3>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                      <div className="card-body">
                        <a className='font-sm' href={"https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/template.xlsx?alt=media&token=f9b7df96-9d00-4917-9bfe-9cc9bb417c65"}>download template</a>
                        <small> *download template excel</small><br/>
                        <div className='form-group'>
                          <label>File Excel</label>
                        </div>
                      </div>
                      <input type="file"  name="file" onChange={this.handleChange()}/>
                      <div className='drop' onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
                      	{this.props.children}
                      </div>

                  </ModalBody>
              </Modal>
            </div>
            <div className='col-md-4 float-right'>
                <input type='text' className='form-control' placeholder='cari data berdasarkan kepala keluarga' value={search} onChange={this.handleFilter}/>
            </div>
          </div>
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">No KK</th>
                        <th scope="col">RW/RT</th>
                        <th scope="col">Kepala Keluarga</th>
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
      taskList = <div className="TaskList-empty">Tidak Ada Data KK</div>;
    }

    return taskList;
  }
}
