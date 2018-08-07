import React from 'react';
import orderBy from 'lodash/orderBy';
import Listkk from './listkeuangan';
import { Refpemasukan, Refpengeluaran } from './../../../../db';
import Listbln from "./../DataIuran/listitembulan";
import Workbook from 'react-excel-workbook'
import NumberFormat from 'react-number-format';
export default class daftarkeuangan extends React.Component {
  state = {
    tasks: [], tasksLoading: true,search:'',judul:'', pilihan:'', subpilihan:'', arraypilihanbulan:[], showbtn:false,
    judulexcel:'', jumlahkeluar:0, jumlahmasuk:0, tglawal:'', uraianawal:'',debetawal:0, arrayexcel:[]
  };

  componentDidMount() {
    this.pilihbulan();
  }

  pilihbulan = () => {
    let tdy = new Date();
    let xtgl=['Desember','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'], arraypilihanbulan=[];
   
    for (let i = 1; i <= 12; i++) {
        let bln = xtgl[i]+"-"+tdy.getFullYear();
        arraypilihanbulan.push({bulan:bln})
    }
    
    //console.log(arraypilihanbulan)
    this.setState({
        arraypilihanbulan
    })
}

  handleChangePilihan = (event) => {
        if(event.target.value.length === 0 || event.target.value === ""){
          
    }else{
        this.setState({ pilihan: event.target.value, showbtn:true });
        let noindex=0;
        let tdy = new Date();
        if(event.target.value === "Januari"+"-"+tdy.getFullYear()){
          noindex = 0;
        }else if(event.target.value === "Februari"+"-"+tdy.getFullYear()){
          noindex = 1;
        }else if(event.target.value === "Maret"+"-"+tdy.getFullYear()){
          noindex = 2;
        }else if(event.target.value === "April"+"-"+tdy.getFullYear()){
          noindex = 3;
        }else if(event.target.value === "Mei"+"-"+tdy.getFullYear()){
          noindex = 4;
        }else if(event.target.value === "Juni"+"-"+tdy.getFullYear()){
          noindex = 5;
        }else if(event.target.value === "Juli"+"-"+tdy.getFullYear()){
          noindex = 6;
        }else if(event.target.value === "Agustus"+"-"+tdy.getFullYear()){
          noindex = 7;
        }else if(event.target.value === "September"+"-"+tdy.getFullYear()){
          noindex = 8;
        }else if(event.target.value === "Oktober"+"-"+tdy.getFullYear()){
          noindex = 9;
        }else if(event.target.value === "November"+"-"+tdy.getFullYear()){
          noindex = 10;
        }else if(event.target.value === "Desember"+"-"+tdy.getFullYear()){
          noindex = 11;
        }
       // console.log(noindex)

        let xtgl=['Desember','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'], tahunnya=0;
        if(noindex > 0){
          tahunnya = tdy.getFullYear();
        }else{
          tahunnya = (tdy.getFullYear()-1);
        }
        let totalsaldoawal=0;
        for (let i = noindex; i >= 0; i--) {
            let bln = xtgl[i]+"-"+tahunnya;
            Refpemasukan.orderByChild("datachart").equalTo(bln).on('value', snap => {
              let ttl=0;
              snap.forEach(datagrafik => {
                if(datagrafik.val().nort === localStorage.getItem("idrt")){
                  ttl = ttl + parseInt(datagrafik.val().jumlah_uang);
                }

              });

              Refpengeluaran.orderByChild("datachart").equalTo(bln).on('value', snap => {
                let ttlkeluar=0;
                snap.forEach(datagrafik => {
                  if(datagrafik.val().nort === localStorage.getItem("idrt")){
                    ttlkeluar = ttlkeluar + parseInt(datagrafik.val().jumlah_uang);
                  }

                });
                totalsaldoawal = totalsaldoawal + (parseInt(ttl) - parseInt(ttlkeluar))
              })

            })
        }
        //console.log("Saldo Awal  ====", totalsaldoawal)
        // this.setState({
        //   debetawal: totalsaldoawal, uraianawal:'Saldo Bulan '+xtgl[noindex]+' '+tahunnya, tglawal:'1 '+xtgl[noindex+1]+' '+tahunnya
        // })
        const tasks = [];
        let sorttgl = "";
        if((noindex+1) >= 10){
          sorttgl = (noindex+1);
        }else{
          sorttgl = "0"+(noindex+1);
        }
        tasks.push({
          jumlah_uang: totalsaldoawal, looparray:'no',tipemasuk : 'FormPemasukan', asaldana:'Saldo Bulan '+xtgl[noindex]+' '+tahunnya, tipe:'masuk', tanggal:tahunnya+'-'+sorttgl+'-'+'1'
        })

      Refpemasukan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
        
        let no = 0, uangmasuk=0, uangkeluar=0;
        snap.forEach(shot => {
          if(shot.val().datachart === event.target.value){
            no++
              tasks.push({ ...shot.val(), key: shot.key, nomer: no, tipe:'masuk', looparray:'yes' });
              uangmasuk = uangmasuk + parseInt(shot.val().jumlah_uang)
          }
        });
        this.setState({
          jumlahmasuk: uangmasuk
        })

        Refpengeluaran.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
          
          snap.forEach(shotkeluar => {
            if(shotkeluar.val().datachart === event.target.value){
              no++
                tasks.push({ ...shotkeluar.val(), key: shotkeluar.key, nomer: no, tipe:'keluar', looparray:'yes' });
                uangkeluar = uangkeluar + parseInt(shotkeluar.val().jumlah_uang)
            }
          });
          this.setState({
            jumlahkeluar: uangkeluar
          })
       // this.setState({ tasks, tasksLoading: false });
        })
      });

      let jmlsaldotmp=totalsaldoawal, arraybaru=[], qq = orderBy(
        tasks, ['looparray','tanggal'], ['asc','asc']
      );;
      let noo = 0, coltgl='', coluraian='', coldebet='',colkredit='', colsaldo='', arrayexport=[];
      var bulan = ['bln','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    
      qq.map(dataku => {
        noo++;
        var pecah = dataku['tanggal'].split("-");
        coltgl = pecah[2]+" "+bulan[parseInt(pecah[1])]+" "+pecah[0];
        
        let inarrayy=0;
        if(dataku['looparray'] === 'no'){
          inarrayy = totalsaldoawal
          coluraian= dataku['asaldana']
          colsaldo = totalsaldoawal
          coldebet = totalsaldoawal
          colkredit = ''
        }else{
          if(dataku['tipe'] === 'masuk'){
          inarrayy = parseInt(jmlsaldotmp) + parseInt(dataku['jumlah_uang']);
          jmlsaldotmp = parseInt(inarrayy);
          if(dataku['tipemasuk'] === 'FormPemasukan'){
            coluraian= dataku['asaldana']

          }else{
            coluraian= dataku['keterangan']

          }
          colsaldo = jmlsaldotmp
          coldebet = dataku['jumlah_uang']
          colkredit = ''
          }else if(dataku['tipe'] === 'keluar'){
          inarrayy = parseInt(jmlsaldotmp) - parseInt(dataku['jumlah_uang']);
          jmlsaldotmp = parseInt(inarrayy);
          coluraian= dataku['keperluan']
          colsaldo = jmlsaldotmp
          coldebet = ''
          colkredit = dataku['jumlah_uang']
         }
        }
        arraybaru.push({
          ...dataku, jumlahsaldo: inarrayy, nomernyatb: noo
        })
        arrayexport.push({
          nomernyatb: noo, tgl: coltgl, uraian:coluraian, debet: coldebet, kredit: colkredit, sisasaldo: colsaldo
        })

      });

      // console.log(arrayexport)

      this.setState({ tasks: arraybaru, arrayexcel: arrayexport, tasksLoading: false, debetawal: totalsaldoawal });


    }
  };

  

  bersih=()=>{
    this.setState({
      pilihan:'', 
      showbtn: false
    })
  }


  render() {
    const { tasks, tasksLoading, arrayexcel, pilihan, arraypilihanbulan, jumlahkeluar, jumlahmasuk, debetawal } = this.state;
     let orderedTasks, btntampil, pesan, tabel, totalbulanini = parseInt(debetawal) + parseInt(jumlahmasuk) - parseInt(jumlahkeluar), masukbulanini = parseInt(debetawal) + parseInt(jumlahmasuk); 
      orderedTasks = orderBy(
        tasks, ['looparray','tanggal'], ['asc','asc']
      );
    if(this.state.showbtn){
      if (tasksLoading) {
        tabel = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-money fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      } else if (orderedTasks.length) {
      tabel = (
        <div className="table-responsive">
          <table className="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Tanggal Transaksi</th>
                    <th scope="col">Uraian</th>
                    <th scope="col">Debet</th>
                    <th scope="col">Kredit</th>
                    <th scope="col">Saldo</th>
                </tr>
            </thead>
            <tbody>
                {orderedTasks.map(task => (
                  <Listkk key={task.key} task={task} />
                ))}
              <tr>
                  <td></td>
                  <td colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold'}}>JUMLAH</td>
                  <td style={{fontWeight: 'bold'}}><NumberFormat value={parseInt(masukbulanini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  <td style={{fontWeight: 'bold'}}><NumberFormat value={parseInt(jumlahkeluar)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  <td style={{fontWeight: 'bold'}}><NumberFormat value={parseInt(totalbulanini)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                  
              </tr>
            </tbody>
          </table>
        </div>
      )
      btntampil = (
            <div className="col-md-3">
                <div className="form-group col-md-12">
                    <label>Pilih Opsi</label>
                    <div className="form-control" style={{ border: 0+'px'}}>
                    <Workbook filename={'Data Keuangan  '+pilihan+'.xlsx'} element={<button style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}} className="btn btn-success" title="Export Data Keuangan"><i className="fa fa-file-excel-o"></i> </button>}>
                      <Workbook.Sheet data={arrayexcel} name="Data Keuangan">
                        <Workbook.Column label="No" value="nomernyatb"/>
                        <Workbook.Column label="Tanggal" value="tgl"/>
                        <Workbook.Column label="Jumlah Uang" value="uraian"/>
                        <Workbook.Column label="Debet" value="debet"/>
                        <Workbook.Column label="Kredit" value="kredit"/>
                        <Workbook.Column label="Saldo" value="sisasaldo"/>
                      </Workbook.Sheet>
                    </Workbook>
                   
                    <button className="btn btn-danger" onClick={this.bersih}style={{ marginBottom: 0.7+'em', marginRight:0.5+'em', marginTop:-0.3 +'em'}}  title="Hapus Filter"><i className="fa fa-times"></i> </button>
        
                    </div>
                </div>
            </div>
      )
      pesan = (
        <div className="alert alert-info alert-dismissible">
          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          {/* <h5><i className="icon fa fa-info"></i> Info!</h5> */}
          Menampilkan Laporan Keuangan {pilihan}, {orderedTasks.length} Transaksi Di Lakukan.
        </div>
      )
    } else {
      tabel = (
          <div className="TaskList-empty">Tidak Ada Data</div>
      );
      }
    }

    return (
      <div className="card-body">

        <div className="row">
            <div className="col-md-3">
                <div className="form-group col-md-12">
                    <label>Pilih Bulan</label>
                    <select className="form-control" style={{height: 2.5 + 'em'}} value={this.state.pilihan} onChange={this.handleChangePilihan}>
                        <option value="">Pilih Bulan</option>
                        {arraypilihanbulan.map(task => (
                            <Listbln key={task.key} task={task} />
                        ))}
                    </select>
                </div>
            </div>
          {btntampil}
          </div>
          {pesan}
          {tabel}
      </div>
    );
  }
}
