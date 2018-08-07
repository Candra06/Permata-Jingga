import React, { Component } from 'react';
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"

import Footer from "./../partials/footer"
import ReactHtmlParser from 'react-html-parser';
import { RefBlog } from './../../../db';
var title = ['Apa itu Biaya Akad','Definisi Perumahan Dan Rumah', 'Belajar Tentang Kehidupan'];
var deskripsi = ['Apa itu Biaya Akad ? sebenarnya ini hanya istilah untuk menggabungkan biaya-biaya yang muncul saat menjelang terjadinya akad kredit / Akta Jual Beli di hadapan notaris. Kali ini Griya Pontianak akan menjelaskan perlahan agar anda lebih memahami pengertian dari biaya akad saat KPR. Saat membeli rumah dengan cara KPR memang kita harus mempersiapkan biaya ekstra selain dari uang muka yang sudah kita keluarkan karena kita tidak hanya berhubungan dengan pihak developer melainkan pihak-pihak lain atau instansi lain seperti bank, asuransi dan ain-lain.',
'Perumahan adalah kelompok rumah yang berfungsi sebagai lingkungan tempat tinggal atau hunian yang dilengkapi dengan prasarana lingkungan yaitu kelengkapan dasar fisik lingkungan, misalnya penyediaan air minum, pembuangan sampah, tersedianya listrik, telepon, jalan, yang memungkinkan lingkungan pemukiman berfungsi sebagaimana mestinya.Rumah adalah tempat untuk melepaskan lelah, tempat bergaul, dan membina rasa kekeluargaan diantara anggota keluarga, tempat berlindung keluarga dan menyimpan barang berharga, dan rumah juga sebagai status lambing social (Azwar, 1996; Mukono,2000)Rumah adalah struktur fisik terdiri dari ruangan, halaman dan area sekitarnya yang dipakai sebagai tempat tinggal dan sarana pembinaan keluarga (UU RI No. 4 Tahun 1992).Menurut WHO, rumah adalah struktur fisik atau bangunan untuk tempat berlindung, dimana lingkungan berguna untuk kesehatan jasmani dan rohani serta keadaan sosialnya baik untuk kesehatan kelu arga dan individu (Komisi WHO Mengenai Kesehatan dan Lingkungan, 2001).',
'Aku belajar dari kehidupan belajar untuk mengerti segala sesuatu belajar untuk dapat memahami banyak hal yang ada di dalam setiap perjalanan hidup ini melihat lebih dekat, mendengar lebih jelas, merasakannya dengan sepenuh hati Aku belajar dari kegagalanbelajar untuk memberikan ruang yang sama padanya sama seperti ketika aku mencapai keberhasilan dalam hidup karena tanpa kegagalan, keberhasilan menjadi sebuah peristiwa langka kegagalan akan menyadarkan bahwa kita bukan siapa-siapa tanpaNya Kegagalan membuat kita memperoleh pelajaran yang berharga Aku belajar dari kesalahan Karena tanpa kesalahan, aku takkan tahu arti meminta maaf, memperbaikinya, Aku takkan bisa mengampuni, memaafkan dan juga bagaimana berbelas kasihan Kesalahan mengajarkan, bahwa tak ada satu pun dari kita yang sempurnaNamun seharusnya kesalahan mengajarkan diri kita untuk mau mengakuinya dan memperbaikinyaAku belajar dari penderitaan karena dari sanalah aku mengerti arti sebuah proses penderitaan mengajarkan bagaiamana kita menjadi dewasa saat menghadapinya dan bisa melewati semua. Penderitaan mengajarkan arti penyerahan hak, ego dan keangkuhan diri. Penderitaan memberi pelajaran tentang bagaiamana kita mampu menjalani, menikmati, mensyukuri dan menyerahkan semuanya pada Sang pemilik kehidupan.']
class DetailBlog extends Component {
  constructor(props){
    super(props);
  this.state = ({ title:'', text:''});

  }
  componentDidMount(){
    // console.log(localStorage.getItem("detail"))
    // if(localStorage.getItem("detail") === "Pengertian-Biaya-Akad"){
    //   this.setState({title:title[0], text:deskripsi[0]});
    // }else if(localStorage.getItem("detail") === "Definisi-Perumahan-Dan-Rumah"){
    //   this.setState({title:title[1], text:deskripsi[1]});
    // }else{
    //   this.setState({title:title[2], text:deskripsi[2]});
    // }
    RefBlog.orderByKey().equalTo(localStorage.getItem("detail")).on("value", snap => {
			// const tasksBlog=[]
			snap.forEach(shot => {
        this.setState({nama:shot.val().nama, tanggal:shot.val().tanggal, urlfoto:shot.val().urlfoto, deskripsi:shot.val().deskripsi})
				// console.log(shot.val())
				// tasksBlog.push({...shot.val(), key:shot.key})
			})
			// this.setState({tasksBlog});
		})	
  }
  render() {
    var image='';
    // if(localStorage.getItem("detail") === "Pengertian-Biaya-Akad"){
    //   image = <img src={Blog}/>
    // }else if(localStorage.getItem("detail") === "Definisi-Perumahan-Dan-Rumah"){
    //   image = <img src={Blog1}/>
    // }else{
    //   image = <img src={Blog2}/>
    // }
    return (
     <div className='home'>
		 <Header/>
		 <div className="container top-80">
      <h3>{this.state.title}</h3>
      <div className="row text-center pengurus top-50">
          <div style={{ width: 70+"%",margin: "auto"}}>
            <img src={this.state.urlfoto} className='img-responsive'/>
          </div>
      </div>
      <h2 className='top-50'>{this.state.nama}</h2>
      <p className="paragraph">{ReactHtmlParser(this.state.deskripsi)}</p>
    </div>
		<Footer/>
     </div>
    );
  }
}

export default DetailBlog;
