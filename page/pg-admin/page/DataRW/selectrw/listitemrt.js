import React from 'react';

export default class listitemrt extends React.Component {
  render() {
    const { task } = this.props;

    return (
        <option value={task.no}>{task.no}</option>
    );
  }
}
