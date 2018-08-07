import React from 'react';
export default class Listrt extends React.Component {
    
  render() {
    const { task } = this.props;
  
    return (
        
        <option value={task.nama}>{task.nama}</option>
        
    );
  }
}
