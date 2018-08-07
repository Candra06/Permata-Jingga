import React from 'react';
import { RefKK, rootRef } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default class ListPengumumanHome extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        modal: false,
        modal2: false,
        nokk: '', jml: '', idrt: '', idrw: ''
      }
      
    }
    deleteTask = () => {
        const { key } = this.props.task;
        RefKK.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
  render() {
    const { task } = this.props;
    return (
         
              <li>
                <i className="fa fa-envelope bg-primary"></i>

                <div className="timeline-item">
                  <span className="time"><i className="fa fa-clock-o"></i> {task.tanggal}</span>

                  <h3 className="timeline-header"><a href="#">{task.nama_pengirim}</a></h3>

                  <div className="timeline-body">
                    <p>{task.isi}</p>
                    
                  </div>
                  <div className="timeline-footer">
                    
                  </div>
                </div>
              </li>
            
    );
  }
}
