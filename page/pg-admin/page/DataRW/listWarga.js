import React from 'react';
import { rootRef, Refwarga} from './../../../../db';

import { toast } from 'react-toastify';
export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
      }
    }
    componentWillMount(){
      const { task } = this.props;
    }

  render() {
    const { task } = this.props;
    let data = [];
    return (
      data = { value: task.nik, label: task.nama, alamat: task.alamat, nama: task.nama }
    );
  }
}