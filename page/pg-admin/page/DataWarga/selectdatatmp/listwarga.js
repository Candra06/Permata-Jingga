import React from 'react';
export default class Listwarga extends React.Component {
   

   
  render() {
    const { task } = this.props;
    return (
       <option value={task.nama}>{task.nama}{' / '}{task.status}</option>
    );
  }
}
