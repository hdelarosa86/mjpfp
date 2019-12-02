import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';

class Nav extends Component {
  constructor() {
    super();

    this.prevDate = this.prevDate.bind(this);
    this.nextDate = this.nextDate.bind(this);
  }

  prevDate(){
      this.props.prevDate();
  }
  nextDate(){
    this.props.nextDate();
  }

  render() {
    return (
      <div>
        <span id="prev" onClick={this.prevDate}>
          Previous
        </span>
        <span id="next" onClick={this.nextDate}>
          Next
        </span>
      </div>
    );
  }
}

export default Nav;
