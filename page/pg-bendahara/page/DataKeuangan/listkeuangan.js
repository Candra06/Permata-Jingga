import React from 'react';
import { Refpemasukan, Refriwayat, timeRef, Refkeuangan } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

export default class Listkeuangan extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        tanggal:'',
        asaldana: '',
        jumlah: 0,
        keterangan:'-',
        saldoakhir:0,
        kunciuang:'',
      }
    }
    componentWillMount(){
          
        let tdy = new Date();
        let hari, bulan;
        let tdyi = tdy.getFullYear()+"-"+(tdy.getMonth()+1)+"-"+tdy.getDate();
        if(tdy.getDate() >= 10){
            hari = tdy.getDate()
        }else{
            hari = "0"+tdy.getDate();
        }
        if((tdy.getMonth()+1) >= 10){
            bulan = (tdy.getMonth()+1)
        }else{
            bulan = "0"+(tdy.getMonth()+1);
        }
        let hariini = tdy.getFullYear()+"-"+bulan+"-"+hari;
        
        this.setState({
            tanggal: tdyi,
            hariini: hariini
        })

        Refkeuangan.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap => {
          
            snap.forEach(shot => {
                if(shot.val().norw === localStorage.getItem("koderw")){
                    this.setState({ saldoakhir: parseInt(shot.val().jumlah_saldo), kunciuang: shot.key});
                }
  
            });
          });
      }
   
    
      
  render() {
 
    const { task } = this.props;
    var bulan = ['bln','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    var pecah = task.tanggal.split("-");
    var tglnya = pecah[2]+" "+bulan[parseInt(pecah[1])]+" "+pecah[0];
    let tampil;
    if(task.tipe === "masuk"){
        if(task.tipemasuk === 'FormPemasukan'){
            tampil = (
                <tr>
                    <td>{task.nomernyatb}</td>
                    <td>{tglnya}</td>
                    <td>{task.asaldana}</td>
                    <td><NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                    <td></td>
                    <td><NumberFormat value={task.jumlahsaldo} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                    
                </tr>
            )
        }else{
            tampil = (
                <tr>
                <td>{task.nomernyatb}</td>
                <td>{tglnya}</td>
                <td>{task.keterangan}</td>
                <td><NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                <td></td>
                <td><NumberFormat value={task.jumlahsaldo} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                
            </tr>
            )
        }
       
    }else{
        tampil = (
            <tr>
            <td>{task.nomernyatb}</td>
            <td>{tglnya}</td>
            <td>{task.keperluan}</td>
            <td></td>
            <td><NumberFormat value={task.jumlah_uang} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
            <td><NumberFormat value={task.jumlahsaldo} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
            
        </tr>
        )
    }
    return tampil;
  }
}
