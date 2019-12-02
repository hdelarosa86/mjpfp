/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
const CalendarDates = require('calendar-dates');
const calendarDates = new CalendarDates();
import Header from './Header';
import Form from './Form';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'Novemeber',
//   'December',
// ];

// const nameOfWeekdays = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ];

class App extends Component {
  constructor() {
    super();
    this.state = {
      year: 0,
      month: 0,
      daysOfTheMonth: [],
    };

    this.nextDate = this.nextDate.bind(this);
    this.prevDate = this.prevDate.bind(this);
  }

  async componentDidMount() {
    const dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const currentDate = new Date(year, month);
    // const daysOfTheMonth = await calendarDates.getMatrix(currentDate);
    const daysOfTheMonth = await calendarDates.getDates(currentDate)
    this.setState({ year, month, daysOfTheMonth });
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
          <Switch>
            <Redirect exact from='/' to={`/${new Date().getFullYear()}/${new Date().getMonth() + 1}`} />
            <Route path={`/${this.state.year}/${this.state.month + 1}`}  render={ props => <Calendar {...this.props} {...this.state}/>}/>
          </Switch>
          </HashRouter>
      </div>
    );
  }
}

export default App;

















  /* <div className="month">
          {daysOfTheMonth.map((week, idx) => {
            return (
              <div key={`week-${idx + 1}`} className="week">
                {week.map((day, index) => {
                  return (
                    <div
                      key={`day-${index + 1}`}
                      className={` day ${
                        day.type === 'current' ? 'current' : 'not-current'
                      }`}
                    >
                      {day.date}
                      <p>{nameOfWeekdays[index]}</p>
                      
                      <button onClick={e => {}}>
                        Add Task
                      </button>
                      <Form id={index}/>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div> 
      </div> */
