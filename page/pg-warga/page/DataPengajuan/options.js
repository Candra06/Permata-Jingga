import React from 'react';

export default class options extends React.Component {
  render() {
    const { task } = this.props;

    return (
        <option value={task.kd_surat}>{task.jenis_surat}</option>
    );
  }
}
