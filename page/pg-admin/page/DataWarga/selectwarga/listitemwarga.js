import React from 'react';

export default class TaskListItem extends React.Component {
  render() {
    const { task } = this.props;

    return (
        <option value={task.nik}>{task.nama}</option>
    );
  }
}
