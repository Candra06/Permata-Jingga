import React from 'react';
import { rootRef, RefKK } from './../../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { toast } from 'react-toastify';
export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
        alamat:''
      }
    }
    componentWillMount(){
      const { task } = this.props;
      RefKK.orderByChild("nokk").equalTo(task.no_kk).on("value", snap => {
        snap.forEach(shot => {
          this.setState({alamat:shot.val().alamat})
        })
      })
    }
  render() {
    const { task } = this.props;

    return (
      { value: task.nik, label: task.name+" Ludfi Rahman" }
    );
  }
}
