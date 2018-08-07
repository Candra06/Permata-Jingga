import React from 'react';

export default class listitemrw extends React.Component {
  render() {
    const { task } = this.props;

    return (
        <option value={task.no}>{task.no}</option>
    );
  }
}
