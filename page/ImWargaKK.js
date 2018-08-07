import React from 'react';
import { RefImport, rootRef, RefKK, RefDataKK } from './../db';
import RandomKata from 'randomstring';
import XLSX from 'xlsx';
import DataHasil from './DataHasil';
import { ToastContainer, toast } from 'react-toastify';
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};
export default class ImWargaKK extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      files:'',
      data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: [], tampilhasil: false, kode:'',kab:'', prov:'', kec:'', kodepos:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }
  componentWillMount() {
    RefDataKK.on('value', snap => {
      snap.forEach(shot => {
          this.setState({
              kab:shot.val().kabupaten,
              kec: shot.val().kecamatan,
              prov: shot.val().provinsi,
              kodepos: shot.val().kodepos
          })
         
          
      });
    });
    let kod = RandomKata.generate(10);
    this.setState({ kode: kod })
    RefImport.on('value', snap => {
      snap.forEach(shot => {
        if(shot.val().kodeimport === kod){

        }else{
          RefImport.remove(shot.val().key)
        }
      });
    });
    localStorage.setItem("kdim", kod)
    
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
      //console.log("datanya "+make_cols(ws['!ref']))
			this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};
 
  
 
  handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) this.handleFile(files[0]);
  };
  
  simpandata =()=> {
    try{
    const {data }= this.state;

    this.setState({ tampilhasil: true})
  data.map(dataku => {
    let co = 0;
    dataku.forEach(shot => {
      co++;
    });
    //console.log("kokoko ", co)
    if(co === 6){
    if(dataku[1] === "Nama Kepala Keluarga" || dataku[4] === "kelurahan"){

    }
    else{
      RefKK.orderByChild("nokk").equalTo(dataku[0]).on("value", snap => {
        let htgnik = 0
        snap.forEach(shot => {
          if(shot.val().nokk === dataku[0] && htgnik == 0){
          htgnik++;
          }else{
            htgnik = 0;
          }
        })
        
        if(htgnik >= 1){
        //   toast.warn('Data ' + dataku[0] + ' GAGAL Di Import, NIK Sudah Di gunakan', {
        //     position: toast.POSITION.TOP_RIGHT,
        // });
       RefImport.push({kodeimport: this.state.kode, nama:'Data KK '+dataku[1], keterangan:"No KK Telah Di Pakai", tipe:"merah"})
        }else{
          
              const htg = {
                kd_kk:RandomKata.generate(10),
                nokk: dataku[0],
                kepala: dataku[1],
                idrt: dataku[3],
                idrw: dataku[2],
                alamat:dataku[5],
                kelurahan: dataku[4],
                kecamatan : this.state.kec,
                kabupaten :   this.state.kab,
                provinsi :  this.state.prov,
                kodepos :   this.state.kodepos
              };
              RefKK.push(htg);
              
            //   toast.success('Data ' + dataku[0] + ' Berhasil Di Import', {
            //     position: toast.POSITION.TOP_RIGHT,
            // });
            
            RefImport.push({kodeimport: this.state.kode, nama:'Data KK '+dataku[1], keterangan:" ", tipe:"hijau"})
            }
          })
          
        }

  }else{
    RefImport.push({kodeimport: this.state.kode, nama:'Data KK '+dataku[1], keterangan:"Ada data kosong!!", tipe:"merah"})
        
  }
  });
  toast.success('Import Selesai', {
    position: toast.POSITION.TOP_RIGHT,
});
//this.toggle()
//console.log(arrayhasil)
    }catch(error){

    }
  }
  
  render() {
    const { tampilhasil,kode } = this.state;
    let hasil;
    if(tampilhasil){
      hasil = (
        <DataHasil kode={kode}/>
      );
    }
    
    const SheetJSFT = [
      "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");
    
 return(
      
      <div className="card card-info">
        <div className="card-header">
            <h3 className="card-title">Import Data KK</h3>
        </div>
        <div className="card-body">
              
          <div className="form-control">
              <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <label>Pilih File Excel</label>
                      <input type="file"  className="form-control-file"  name="file" id="file" accept={SheetJSFT} onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="col-md-8">
                {/* <div class="custom-file">
                  <input type="file" class="custom-file-input" id="validatedCustomFile" required/>
                  <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                </div> */}
                  <div className="form-group col-md-12">
                      <button type="submit" className="btn btn-primary" onClick={this.simpandata}><i className="fa fa-save"></i> Simpan Data</button>
                      <span>  </span>
                      <a className='font-sm' href={"https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/template_import_KK.xlsx?alt=media&token=ada7813f-0d38-4eea-8c83-e88b8e7beeb7"}>
                        <button type="submit" className="btn btn-success"><i className="fa fa-download"></i> Download Template</button>
                      </a>
                  </div>
              </div>

          </div>
          {hasil}
        </div>
      </div>
 )
    
  }
}
