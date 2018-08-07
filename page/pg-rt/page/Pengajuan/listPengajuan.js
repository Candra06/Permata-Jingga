import React from 'react';
import { rootRef, RefWarga, RefKK, RefPengajuan, timeRef, RefRW, RefRT, RefNoSurat } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
export default class ListPengajuanBaru extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        nokk: '', jml: '', 
        idrt: '', 
        idrw: '', 
        kode:'', 
        modal2: false, 
        modal3: false,
        noawal:'',
        kunci:'',
        tercetak:0
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 =this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    toggle2 = () => {
        this.setState({
          modal2: !this.state.modal2
        });
      }
    toggle3 = () => {
        this.setState({
          modal3: !this.state.modal3
        });
      }
      // handleChangeKode = event => {
      //   this.setState({kode:event.target.value});
      //   if(event.target.value == ''){
      //     this.setState({valid:"is-invalid"});
      //   }
      // }

      componentWillMount(){
        RefNoSurat.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
            
          snap.forEach(shot => {
              this.setState({
                kunci: shot.key,
                noawal: shot.val().no_awal,
                tercetak: shot.val().tercetak
              })
          })
      })
      }
    // action(key, status, penerima, jenis){

    //     rootRef.child('Pengajuan').child(key).update({status:status});
    //     var tipe, teks;
    //     let today =new Date();
    //     if(status === "Proses"){
    //       tipe = "kuning";
    //       teks = "Pengajuan "+jenis+" anda sedang di proses pada tanggal ("+today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()+")";
    //     }else if(status === "Tolak"){
    //       tipe = 'merah';
    //       teks = "Pengajuan "+jenis+" anda di tolak pada tanggal ("+today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()+")";
    //     }else{
    //       tipe = 'hijau';
    //       teks = "Pengajuan "+jenis+" anda telah selesai di proses pada tanggal ("+today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()+")";
    //     }
    //     var notif= {
    //                 nama_pengirim:localStorage.getItem("nama"),
    //                 nik_penerima:penerima,
    //                 nik_pengirim:localStorage.getItem("nik"),
    //                 teks:teks,
    //                 time_notif:timeRef,
    //                 tipe:tipe
    //               }
    //     rootRef.child('Notifikasi').push(notif);
    //     toast.success('Data Berhasil Di Update', {
    //         position: toast.POSITION.TOP_RIGHT,
    //     });
    // }
    
    hapus = () => {
      const { task } = this.props;
      RefPengajuan.child(task.key).remove();

      toast.success('Data Berhasil Di Hapus', {
          position: toast.POSITION.TOP_RIGHT,
      });
    }
    cetak = event => {
      const { task } = this.props;
      const {noawal,tercetak,kunci} = this.state;
      let namarw="", namart="",nosurat=0;
     
        RefRW.orderByChild("no").equalTo(localStorage.getItem("koderw")).on('value', snap => {
          snap.forEach(shott => {
            namarw = shott.val().nama;
          });
  
          RefRT.orderByChild("no").equalTo(parseInt(localStorage.getItem("idrt"))).on('value', snap => {
            snap.forEach(shottt => {
              if(shottt.val().norw === localStorage.getItem("koderw")){

              namart = shottt.val().nama;
              }
            });
            let nocetak =(parseInt(noawal)+tercetak);
            let up = tercetak + 1;
            var bulan = ['bln','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','desember']
            var pecah = task.tgl_pengajuan.split("-");
            var tglnya = pecah[0]+" "+bulan[pecah[1]]+" "+pecah[2]
            window.open("http://webbeta.wargaku.id/apps?nama_pemohon="+task.nama+"&kebutuhan="+task.kebutuhan+"&pekerjaan="+task.pekerjaan+"&notelp="+task.no_telp+"&tglcetak="+tglnya+"&tempat_lahir="+task.tempat_lahir+"&tanggal_lahir="+task.tgl_lahir+"&idrt="+localStorage.getItem("idrt")+"&idrw="+localStorage.getItem("koderw")+"&alamat="+task.alamat+"&kode="+nocetak+"&nama_rt="+namart+"&nama_rw="+namarw, "_blank");
            RefNoSurat.child(kunci).update({
              tercetak: up
            })
          });
          
  
        });

      RefPengajuan.child(task.key).update({
        status:'Selesai'
      })


      // var idrt='';
      // var idrw='', alamat='', nikrt='', namart='';
      // var teks= '';
      // console.log(task.pemohon);
      // RefWarga.orderByChild("nik").equalTo(task.pemohon).on('value', snap => {
      //   snap.forEach(shot => {
      //     console.log(shot.val());
      //     localStorage.setItem("nama_pemohon", shot.val().nama);
      //     // this.setState({nama:shot.val().nama});
      //     // console.log(shot.val().nama);
      //     localStorage.setItem("status", shot.val().status);
      //     // this.setState({status:shot.val().status});
      //     localStorage.setItem("tgl_lahir", shot.val().tgl_lahir);
      //     localStorage.setItem("tempatlahir", shot.val().tempatlahir);
      //     // this.setState({tgl_lahir:shot.val().tgl_lahir});
      //     localStorage.setItem("gender", shot.val().gender);
      //     // this.setState({gender:shot.val().gender});
      //     localStorage.setItem("nik_pemohon", shot.val().nik);
      //     // this.setState({nik:shot.val().nik});
      //     localStorage.setItem("agama", shot.val().agama);
      //     // this.setState({agama:shot.val().agama});
      //     localStorage.setItem("vno_kk", shot.val().no_kk);

      //   });
      // });

      // RefPengajuan.orderByChild("pemohon").equalTo(task.pemohon).on('value', snap => {
      //   snap.forEach(shott => {
      //     if(shott.val().status === "Proses"){
      //         teks = shott.val().kebutuhan;
      //         localStorage.setItem("teks", teks);
      //     }
      //   });
      // });
      // console.log(this.state);
      // var htg = {
      //   id_surat:RandomKata.generate(10),
      //   kode_surat:task.kd_surat,
      //   nik_pembuat:localStorage.getItem("nik"),
      //   nik_pemohon:task.pemohon
      // }
      // console.log(localStorage.getItem("vno_kk"));
      // RefKK.orderByChild("nokk").equalTo(localStorage.getItem("vno_kk")).on('value', snap => {
      //   snap.forEach(shot => {
      //     idrt = shot.val().idrt;
      //     idrw = shot.val().idrw;
      //     alamat = shot.val().alamat;
      //     localStorage.setItem("vidrt", shot.val().idrt);
      //     localStorage.setItem("vidrw", shot.val().idrw);
      //     localStorage.setItem("alamat", shot.val().alamat);
      //   });
      // });
      // var htg = {
      //   id_surat:RandomKata.generate(10),
      //   kode_surat:task.kd_surat,
      //   nik_pembuat:localStorage.getItem("nik"),
      //   nik_pemohon:task.pemohon
      // }
      // Action("addSurat", htg).then ((result) => {
      //     if(result!=''){
      //         console.log("success");
      //     }else{
      //         console.log("errors");
      //     }
      // })
      // console.log(localStorage.getItem('nama_pemohon'));
      //window.open("http://webbeta.wargaku.id/apps?nama_pemohon="+localStorage.getItem('nama_pemohon')+"&id_surat="+htg.id_surat+"&kebutuhan="+task.kebutuhan+"&tempat_lahir="+localStorage.getItem('tempatlahir')+"&status="+localStorage.getItem('status')+"&tanggal_lahir="+localStorage.getItem('tgl_lahir')+"&jenis_kelamin="+localStorage.getItem('gender')+"&idrt="+localStorage.getItem("idrt")+"&idrw="+localStorage.getItem("koderw")+"&nik="+localStorage.getItem('nik_pemohon')+"&agama="+localStorage.getItem('agama')+"&alamat="+localStorage.getItem('alamat')+"&no_kk="+localStorage.getItem('no_kk')+"&nikrt="+nikrt+"&kode="+task.kd_surat+"&nama_rt="+localStorage.getItem("nama"), "_blank");
    }
  render() {
    const { task } = this.props;
    let action, showbtn;
    if(task.status === "Pending"){
      showbtn= (
        <div>
          <Button  onClick={(e) => this.cetak()} color="success">Print Pengajuan</Button>
        </div>
      )
      action = (
        <div className="btnlist">
          <button onClick={this.toggle2} className="btn btn-primary btn-sm"><i className="fa fa-list"></i></button>
            <span>  </span>
              <button onClick={(e) => this.cetak()} className="btn btn-success btn-sm"><i className="fa fa-print"></i></button>
              <span>  </span>
              <button onClick={(e) => this.toggle3()} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
          </div>
          );
  }else if(task.status === "Selesai"){
    showbtn= (
      <div>
        <Button  onClick={(e) => this.cetak()} color="success">Print Ulang</Button>
      </div>
    )
      action = (
        <div className="btnlist">
        <button onClick={this.toggle2} className="btn btn-primary btn-sm"><i className="fa fa-list"></i></button>
          {'  '}
          <button className="btn btn-success btn-sm"><i className="fa fa-check"></i></button>
          {'  '}
          <button onClick={(e) => this.toggle3()} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
          {/* <a onClick={(e) => this.cetak(task.pemohon, task.kebutuhan)}><button className="btn btn-success btn-sm">Print Pengajuan</button></a> */}
          
        </div>
          );
  }
    return (

      <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td><a href={'tel:'+task.no_telp}>{task.no_telp}</a></td>
        <td>{task.kebutuhan}</td>
        <td>{action}</td>
          <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                  <ModalHeader toggle={this.toggle2}>Detail Pengajuan </ModalHeader>
                  <ModalBody>
                   
                    <div id="print-mount">
                      <div className="table-responsive">
                      <table className="table">
                      <tbody>
                      <tr>
                          <td>Nama Warga</td>
                          <td>{task.nama}</td>
                      </tr>
                      <tr>
                          <td>No HP</td>
                          <td><a href={'tel:'+task.no_telp}>{task.no_telp}</a></td>
                      </tr>
                      <tr>
                          <td>Tempat Lahir</td>
                          <td>{task.tempat_lahir}</td>
                      </tr>
                      <tr>
                          <td>Tanggal Lahir</td>
                          <td>{task.tgl_lahir}</td>
                      </tr>
                      <tr>
                          <td>Pekerjaan</td>
                          <td>{task.pekerjaan}</td>
                        </tr>
                      <tr>
                          <td>email</td>
                          <td>{task.email}</td>
                      </tr>
                      <tr>
                          <td>Alamat</td>
                          <td>{task.alamat}</td>
                      </tr>
                      <tr>
                          <td>Kebutuhan</td>
                          <td>{task.kebutuhan}</td>
                      </tr>
                      <tr>
                          <td>Tanggal Pengajuan</td>
                          <td>{task.tgl_pengajuan}</td>
                      </tr>
                      <tr>
                          <td>Status Pengajuan</td>
                          <td>{task.status}</td>
                      </tr>
                  </tbody>
                  </table>
                  </div>
                  </div>
             
            </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggle2}>Tutup</Button>{' '}
              {showbtn}
          </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
            <ModalHeader toggle={this.toggle3}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                Data Pengajuan {task.nama} Akan di Hapus!!!
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle3}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) =>this.hapus()}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>View Pengajuan </ModalHeader>
          <ModalBody>

          </ModalBody>
        </Modal>
      </tr>

    );
  }
}
