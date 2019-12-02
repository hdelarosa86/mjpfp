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
import daysOfTheMonth from '../redux/actions';
import { DAYS_OF_THE_MONTH } from '../redux/constants';
import { createStore } from 'redux';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

// const DAYS_OF_THE_MONTH = 'DAYS_OF_THE_MONTH';
// const initState = {
//   year: new Date().getFullYear(),
//   month: new Date().getMonth(),
//   daysOfTheMonth: [],
//   tasks: [],
//   task: '',
//   timeValue: '12:00',
// };

// const reducer = (state = initState, action) => {
//   if (action.type === 'DAYS_OF_THE_MONTH') {
//     state.daysOfTheMonth = action.daysOfTheMonth;
//   }
//   console.log('state: ', state);
//   return state;
// };

// const store = createStore(reducer);

class App extends Component {
  constructor() {
    super();
    this.state = store.getState();

    // this.nextDate = this.nextDate.bind(this);
    // this.prevDate = this.prevDate.bind(this);
  }

  // async componentDidMount() {
  //   const page = this.props.location.pathname;
  //   store.dispatch({
  //     type: ADD_PEOPLE,
  //     people: (await axios.get(`/api/employees${page}`)).data.rows,
  //   });
  //   store.dispatch({
  //     type: ADD_COUNT,
  //     count: (await axios.get(`/api/employees${page}`)).data.count,
  //   });
  //   this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  // }

  async componentDidMount() {
    // const dt = new Date();
    // const year = dt.getFullYear();
    // const month = dt.getMonth();
    // const currentDate = new Date(year, month);
    // // const daysOfTheMonth = await calendarDates.getMatrix(currentDate);
    // store.dispatch({
    //   type: DAYS_OF_THE_MONTH,
    //   daysOfTheMonth: await calendarDates.getDates(currentDate),
    // });
    // // const daysOfTheMonth = await calendarDates.getDates(currentDate)
    // this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

    // // this.setState({ year, month, daysOfTheMonth });
  }

  // async nextDate() {
  //   let currMonth = this.state.month;
  //   let thisYearOrNah = this.state.year;
  //   let nextMonth;
  //   if (currMonth === 11) {
  //     nextMonth = 0;
  //     thisYearOrNah = thisYearOrNah + 1;
  //   } else {
  //     nextMonth = currMonth + 1;
  //   }
  //   const nextDate = new Date(thisYearOrNah, nextMonth);
  //   const daysOfTheMonth = await calendarDates.getDates(nextDate);
  //   this.setState({ year: thisYearOrNah, month: nextMonth, daysOfTheMonth });
  // }

  // async prevDate() {
  //   let currMonth = this.state.month;
  //   let thisYearOrNah = this.state.year;
  //   let prevMonth;
  //   if (currMonth === 0) {
  //     prevMonth = 11;
  //     thisYearOrNah = thisYearOrNah - 1;
  //   } else {
  //     prevMonth = currMonth - 1;
  //   }
  //   const prevDate = new Date(thisYearOrNah, prevMonth);
  //   const daysOfTheMonth = await calendarDates.getDates(prevDate);
  //   this.setState({ year: thisYearOrNah, month: prevMonth, daysOfTheMonth });
  // }

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
              path={`/${this.state.year}/${this.state.month + 1}`}
              render={props => <Calendar {...props}/>}
            />
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
