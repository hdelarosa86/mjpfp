import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Form from './Form';
import { store } from '../redux/store';
import { getDays, getMonth, getYear } from '../redux/actions';
const CalendarDates = require('calendar-dates');
const calendarDates = new CalendarDates();

class Calendar extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  async componentDidMount() {
    const dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const currentDate = new Date(year, month);
    const days = await calendarDates.getDates(currentDate);
    store.dispatch(getDays(days));
    store.dispatch(getMonth(month));
    store.dispatch(getYear(year));
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  async componentDidUpdate(prevProps) {
    const prevPage = prevProps.match.url;
    const currPage = this.props.match.url;
    if( prevPage !== currPage){
    const year = parseInt(prevProps.match.params.year)
    const month = parseInt(prevProps.match.params.month)
    const currentDate = new Date(year, month);
    const days = await calendarDates.getDates(currentDate);
    store.dispatch(getDays(days));
    store.dispatch(getMonth(month));
    store.dispatch(getYear(year));
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });}
  }

  render() {
    console.log('Calendar: ', this.state);
    const { daysOfTheMonth } = this.state;
    return (
      <div className="month">
        {daysOfTheMonth.map((date, index) => {
          return (
            date.type === 'current' && (
              <div key={index} className="calendar-date">
                {date.date}

                <span className='add-task'>
                  <Link
                    to={`/${this.state.year}/${this.state.month + 1}/${
                      date.date
                    }`}
                  >
                    +
                  </Link>
                </span>
                {/* {tasks.map((task, idx) => {
                  return (
                    task.day === date.date && (
                      <p className={task.completed ? '' : 'not-completed'}>
                        {task.name}
                      </p>
                    )
                  );
                })} */}
              </div>
            )
          );
        })}

        <Route
          path={`/${this.props.year}/${this.props.month + 1}/:date`}
          render={props => <Form {...this.props} {...props} />}
        />
      </div>
    );
  }
}

export default Calendar;


//   async componentDidMount() {
//     const tasks = (await axios.get('http://localhost:3000/api/tasks')).data;
//     this.setState({
//       tasks: tasks
//         .filter(task => {
//           return task.year === this.props.year;
//         })
//         .filter(task => {
//           return task.month === this.props.month + 1;
//         }),
//     });
//   }
