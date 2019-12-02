import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
const CalendarDates = require('calendar-dates');
const calendarDates = new CalendarDates();
import { store } from '../redux/store';
import { getDays, getMonth, getYear } from '../redux/actions';

class Nav extends Component {
  constructor() {
    super();

    this.prevDate = this.prevDate.bind(this);
    this.nextDate = this.nextDate.bind(this);
  }

  async nextDate() {
    let currMonth = this.props.month;
    let thisYearOrNah = this.props.year;
    let nextMonth;
    if (currMonth === 11) {
      nextMonth = 0;
      thisYearOrNah = thisYearOrNah + 1;
    } else {
      nextMonth = currMonth + 1;
    }
    const nextDate = new Date(thisYearOrNah, nextMonth);
    const days = await calendarDates.getDates(nextDate);
    store.dispatch(getDays(days));
    store.dispatch(getMonth(nextMonth));
    store.dispatch(getYear(thisYearOrNah));
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  async prevDate() {
    let currMonth = this.props.month;
    let thisYearOrNah = this.props.year;
    let prevMonth;
    if (currMonth === 0) {
      prevMonth = 11;
      thisYearOrNah = thisYearOrNah - 1;
    } else {
      prevMonth = currMonth - 1;
    }
    const prevDate = new Date(thisYearOrNah, prevMonth);
    const days = await calendarDates.getDates(prevDate);
    store.dispatch(getDays(days));
    store.dispatch(getMonth(prevMonth));
    store.dispatch(getYear(thisYearOrNah));
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    console.log('Nav: ',this.props);
    return (
      <div>
        {/* <Link to={}>Previous</Link> */}
        {/* <span id="prev" onClick={this.prevDate}> </span> */}
          
       
        {/* <Link to={}>Next</Link> */}
        {/* <span id="next" onClick={this.nextDate}></span> */}
      </div>
    );
  }
}

export default Nav;
