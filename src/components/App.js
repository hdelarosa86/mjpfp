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

    this.nextDate = this.nextDate.bind(this);
    this.prevDate = this.prevDate.bind(this);
  }

 
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async nextDate() {
    let currMonth = this.state.month;
    let thisYearOrNah = this.state.year;
    let nextMonth;
    if (currMonth === 11) {
      nextMonth = 0;
      thisYearOrNah = thisYearOrNah + 1;
    } else {
      nextMonth = currMonth + 1;
    }
    const nextDate = new Date(thisYearOrNah, nextMonth);
    const daysOfTheMonth = await calendarDates.getDates(nextDate);
    this.setState({ year: thisYearOrNah, month: nextMonth, daysOfTheMonth });
  }

  async prevDate() {
    let currMonth = this.state.month;
    let thisYearOrNah = this.state.year;
    let prevMonth;
    if (currMonth === 0) {
      prevMonth = 11;
      thisYearOrNah = thisYearOrNah - 1;
    } else {
      prevMonth = currMonth - 1;
    }
    const prevDate = new Date(thisYearOrNah, prevMonth);
    const daysOfTheMonth = await calendarDates.getDates(prevDate);
    this.setState({ year: thisYearOrNah, month: prevMonth, daysOfTheMonth });
  }

  render() {
    return (
      <div>
        <Header {...this.state} />

        <HashRouter>
          <Route
            render={props => (
              <Nav
                prevDate={this.prevDate}
                nextDate={this.nextDate}
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
