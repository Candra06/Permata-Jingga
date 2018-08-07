import React from 'react';
import { RefNotif, RefPengajuan, rootRef } from './../../../../db';
import { ToastContainer, toast } from 'react-toastify';

export default class Listnotif extends React.Component {
    constructor(props) {
        super(props);
    };
    deleteTasks = () =>{
      const { key } = this.props.task;
      RefNotif.child(key).remove();
      toast.success('Data Berhasil Di Hapus', {
          position: toast.POSITION.TOP_RIGHT,
      });
    };

    componentDidMount() {

        // localStorage.setItem("DataPemohon", "12345");
        rootRef.child("Notifikasi").orderByChild("nik_penerima").equalTo(localStorage.getItem("nik")).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key });
          });
          this.setState({ tasks, tasksLoading: false });
        });
      }
  render() {
    const { task } = this.props;
    let cek;
   if(task.tipe === "biru"){
        cek = (
            <div className="timeline-item">
                    <h6 className="timeline-header border-red"> {task.teks} </h6>
                </div>
        );
    }else if(task.tipe === "kuning"){
      cek = (
        <div className="timeline-item">
                <h6 className="timeline-header border-red"> {task.teks}</h6>
            </div>
    );
    }
    return (
        <li>
                        <i className="fa fa-envelope bg-primary"></i>
                        <div className="timeline-item">
                          {/* <span className="time"><i className="fa fa-times"></i> {task.tanggal}</span> */}
                          <span onClick={this.deleteTasks} className="time"><i   className="fa fa-trash"></i></span>
                          <h5 className="timeline-header"><a href="">{task.nama_pengirim}</a> Mengirim pemberitahuan kepada anda</h5>
                            <div className="timeline-body">
                            {cek}
                            </div>
                        </div>
                      </li>
    );
  }
}
