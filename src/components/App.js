/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
const CalendarDates = require('calendar-dates');
const calendarDates = new CalendarDates();
import Header from './Header';
import Nav from './Nav';
import { store } from '../redux/store';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = store.getState();

    // this.nextDate = this.nextDate.bind(this);
    // this.prevDate = this.prevDate.bind(this);
  }

 
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Header {...this.state} />

        <HashRouter>
          <Route
            render={props => (
              <Nav
                // prevDate={this.prevDate}
                // nextDate={this.nextDate}
                {...props}
                {...this.state}
              />
            )}
          />
          <Switch>
            <Redirect
              exact
              from="/"
              to={`/${new Date().getFullYear()}/${new Date().getMonth() + 1}`}
            />
            <Route
              path={'/:year/:month'}
              render={props => <Calendar {...props}/>}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
