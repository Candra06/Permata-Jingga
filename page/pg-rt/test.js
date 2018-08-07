import React, { Component } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { rootRef, RefPengumuman, timeRef } from '../../db';
import DaftarKK from "./page/DataKK/daftarkk";
import {Pagination} from "react-bootstrap";
import orderBy from 'lodash/orderBy';

class Test extends Component {
  constructor(props) {
      super(props);
      this.state = { pager: {} };
  }
  componentWillMount() {
        // set page if items array isn't empty

  }

    render() {
          return (
            <div></div>
          )
      }
}

export default Test;
