import React from 'react';

export default class Listitembulan extends React.Component {
  render() {
    const { task } = this.props;

    return (
        <option value={task.bulan}>{task.bulan}</option>
    );
  }
}
