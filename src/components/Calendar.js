import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Form from './Form';
import { store } from '../redux/store';
import { getDays, getMonth, getYear }from '../redux/actions';
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
    console.log('cdm: ',this.state);
  }

    componentDidUpdate(prevProps){

    }

  

  render() {
      console.log('before render: ', this.state);
      const{ daysOfTheMonth } = this.state;
    return (
      <div className="month">
        {daysOfTheMonth.map((date, index) => {
          return (
            date.type === 'current' && (
              <div key={index} className="calendar-date">
                {date.date}

                <span>
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

// <div className="month">
//   {daysOfTheMonth.map((week, idx) => {
//     return (
//       <div key={`week-${idx + 1}`} className="week">
//         {week.map((day, index) => {
//           return (
//             <div
//               key={`day-${index + 1}`}
//               className={` day ${
//                 day.type === 'current' ? 'current' : 'not-current'
//               }`}
//             >
//               {day.date}
//               <p>{nameOfWeekdays[index]}</p>
//               <button><Link to={`/${this.state.year}/${this.state.month + 1}`} className={ location.pathname === `/companies/${company.id}` ? 'selected' : ''}>
//                   { company.name }
//                   </Link></button>

//             </div>
//           );
//         })}
//       </div>
//     );
//   })}
// </div>

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
