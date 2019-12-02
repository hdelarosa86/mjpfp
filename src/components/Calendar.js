import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import months from './dateObj';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

// import React, { Component } from 'react';
// import React, { Component } from 'react';

const nameOfWeekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

class Calendar extends Component {
  constructor(props) {
    super();
    this.state={

    }
    // this.create = this.create.bind(this);
  }

//   async create(task){
//     await axios.post(`http://localhost:3000/api/${this.props.year}/${this.props.month + 1}`, task).data;
//     // const notes = [...this.state.notes, created ];
//     // this.setState({ notes }); 
//   }


  render() {
    const { daysOfTheMonth } = this.props;
    const { create } = this;
    return (
      <div className="month">
        {daysOfTheMonth.map((date, index) => {
          return (
            date.type === 'current' && (
              <div key={index} className="calendar-date">
                {date.date}
                <span>
                  <Link
                    to={`/${this.props.year}/${this.props.month + 1}/${
                      date.date
                    }`}
                  >
                    +
                  </Link>
                </span>
              </div>
            )
          );
        })}

        <Route
          path={`/${this.props.year}/${this.props.month + 1}/:date`}
          render={(props) => <Form {...this.props}  {...props}/>}
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
