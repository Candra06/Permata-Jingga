import React from 'react';

export default class TaskListItem extends React.Component {
  render() {
    const { task } = this.props;

    return (
        <option value={task.key}>{task.no}</option>
    );
  }
}
