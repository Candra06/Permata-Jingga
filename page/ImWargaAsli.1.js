import React from 'react';
import { RefImport, RefWarga, RefUser } from './../db';
import RandomKata from 'randomstring';
import XLSX from 'xlsx';
import DataHasil from './DataHasil';
import { ToastContainer, toast } from 'react-toastify';
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};
export default class ImWargaAsli extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      files:'',
      data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: [], tampilhasil: false, kode:'', cekemail: false, ceknik: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }
  componentDidMount() {
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
    //console.log("kodenya : ",kod)
    
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
  handleFilter = event => {
    this.setState({ search: event.target.value });
  };
  
 
  handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) this.handleFile(files[0]);
  };
  cariemail(txemail){
    try{
      RefUser.orderByChild("email").equalTo(txemail).on('value', snap => {
        let no = 0;
        snap.forEach(shot => {
          no++;
        });
        if(no >= 1){
          localStorage.setItem("pjgemail", true)
          this.setState({ cekemail: true });
          
        }else{
          localStorage.setItem("pjgemail", false)
        this.setState({ cekemail: false });
        }
      });
    }catch(error){

    }
console.log("pjgemail : ", localStorage.getItem("pjgemail"))
  }
  carinik(txnik){
    try{
      RefWarga.orderByChild("nik").equalTo(txnik).on('value', snap => {
        let no = 0;
        snap.forEach(shot => {
          no++;
        });
        if(no >= 1){
          localStorage.setItem("pjgnik", true)
          this.setState({ ceknik: true });
        }else{
          
          localStorage.setItem("pjgnik", false)
        this.setState({ ceknik: false });
        }
      });
    }catch(error){

    }
    console.log("pjgnik : ",localStorage.getItem("pjgnik"))
  }
  simpandata =()=> {
    try{
    const {data, cekemail, ceknik }= this.state;

    this.setState({ tampilhasil: true})
    data.map(dataku => {
    let co = 0;
    dataku.forEach(shot => {
      co++;
    });
    //console.log("kokoko ", co)
    if(co === 23){

    if(dataku[0] === "Nama"){

    }
   
    else{
      var nikdata = dataku[1], emaildata=dataku[7];
      this.carinik(nikdata);
      this.cariemail(emaildata);
      // localStorage.setItem("pjgnik", 0)
      // localStorage.setItem("pjgemail", 0)
      // let arraynik=[], arrayemail=[], jmlnik = 0, jmlemail=0;
      // var nikdata = dataku[1], emaildata=dataku[7];
      // RefWarga.orderByChild("nik").equalTo(nikdata).on("value", snap => {
      //   snap.forEach(shot => {
      //     arraynik.push(shot.val());
           
      //   })
      //   jmlnik = arraynik.length;
      //   localStorage.setItem("pjgnik", arraynik.length)
      
      // 
      // RefUser.orderByChild("email").equalTo(emaildata).on("value", snap => {
      //       snap.forEach(shot => {
      //         arrayemail.push(shot.val());

      //       })
      //       jmlemail = arrayemail.length;
      //       localStorage.setItem("pjgemail", arrayemail.length)
        
      //     

        if(localStorage.getItem("pjgnik")){
        //   toast.warn('Data ' + dataku[0] + ' GAGAL Di Import, NIK Sudah Di gunakan', {
        //     position: toast.POSITION.TOP_RIGHT,
        // });
        RefImport.push({kodeimport: this.state.kode, nama:dataku[0], keterangan:"NIK Telah Di Pakai", tipe:"merah"})
        }else if(localStorage.getItem("pjgemail")){
            //   toast.warn('Data ' + dataku[0] + ' GAGAL Di Import, Email Sudah Di gunakan', {
            //     position: toast.POSITION.TOP_RIGHT,
            // });
            // arrayemail = [];
            // jmlemail=0
      RefImport.push({kodeimport: this.state.kode, nama:dataku[0], keterangan:"Email Telah Di Pakai", tipe:"merah"})
        }else if(!localStorage.getItem("pjgemail") && !localStorage.getItem("pjgnik")){
              const datawargadua = {
                nama: dataku[0],
                nik: dataku[1],
                tempatlahir: dataku[9],
                tgl_lahir: dataku[10],
                nohp: dataku[8],
                agama: dataku[6],
                pekerjaan: dataku[13],
                pendidikan: dataku[14],
                status_nikah: dataku[16],
                kewarganegaraan: dataku[15],
                namaayah: dataku[11],
                namaibu: dataku[12],
                gender:dataku[5],
                email: dataku[7],
                status: dataku[17],
                fb: dataku[20],
                wa: dataku[19],
                ig: dataku[22],
                twitter: dataku[21],
                no_kk : dataku[2],
                urlfoto:"",
                filename: "",
                tipewarga: "Asli",
                nort: dataku[4],
                norw: dataku[3]
              }
              const setakun = {
                kd_user: RandomKata.generate(10),
                email: dataku[7],
                nik:dataku[1],
                password:dataku[18],
                level:"Warga"
              }
              // if(arrayemail.length || arraynik.length){
              //   RefImport.push({kodeimport: this.state.kode, nama:dataku[0], keterangan:"Periksa Email atau NIK", tipe:"merah"})
              // }else{
              // RefUser.push(setakun)
              // RefWarga.push(datawargadua)
              // arrayemail = [];
              // arraynik = [];
              
            //   toast.success('Data ' + dataku[0] + ' Berhasil Di Import', {
            //     position: toast.POSITION.TOP_RIGHT,
            // });
            
            RefImport.push({kodeimport: this.state.kode, nama:dataku[0], keterangan:" ", tipe:"hijau"})
              // }
            }
        //   })
        // })

    }
  }else{
    RefImport.push({kodeimport: this.state.kode, nama:dataku[0], keterangan:"Ada data kosong!!", tipe:"merah"})
        
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
            <h3 className="card-title">Import Data Warga Asli</h3>
        </div>
        <div className="card-body">
              
          <div className="form-control">
              <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <label>Pilih File Excel</label>
                      <input type="file"  className="form-control-file"  name="file" id="file" accept={SheetJSFT} onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="form-group col-md-12">
                      <button type="submit" className="btn btn-primary" onClick={(e) => this.simpandata()}><i className="fa fa-save"></i> Simpan Data</button>
                      <span>  </span>
                      <a className='font-sm' href={"https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/template-import-warga-asli.xlsx?alt=media&token=15c8c64b-cd74-43c4-97eb-30bebe276b43"}>
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
