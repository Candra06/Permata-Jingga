import React from 'react';

export default class Listpengumumanumum extends React.Component {
   
  render() {
    const { task } = this.props;
    
    return (
        <div className="post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" alt='wargaku.id' src="https://firebasestorage.googleapis.com/v0/b/primaitectproject.appspot.com/o/avatar5.png?alt=media&token=ef4fc2d5-48b1-4dd5-af88-08c69cc20b2e"/>
          <span className="username">
            <a href="">{task.nama_pengirim}</a>
            <a href="" className="float-right btn-tool"><i className="fa fa-times"></i></a>
          </span>
          <span className="description">Di Publish Pada {task.tanggal}</span>
        </div>
        <p>
          {task.isi}
        </p>
      </div>
    );
  }
}
