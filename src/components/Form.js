import React, { Component } from 'react';
import ordinal from 'ordinal';
import axios from 'axios';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novemeber',
  'December',
];

class Form extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      timeValue: '12:00',
    };
    this.create = this.create.bind(this);
  }

  componentDidMount() {}

  // create() {
  //   this.props.create({
  //     task: this.state.task,
  //     timeValue: this.state.timeValue,
  //   });
  // }

  async create(task){
    await axios.post(`http://localhost:3000/api/${this.props.year}/${this.props.month + 1}/${this.props.match.params.date}`, task).data;
    // const notes = [...this.state.notes, created ];
    // this.setState({ notes }); 
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>
          Create Task on {months[this.props.month]}{' '}
          {ordinal(this.props.match.params.date * 1)}
        </h3>
        <form
          className="form"
          onSubmit={ev => {
            ev.preventDefault();
          }}
        >
          <input
            onChange={ev => {
              this.setState({ task: ev.target.value });
            }}
            type="text"
            placeholder="Task"
          />

          <input
            onChange={ev => {
              console.log(ev.target.value);
              this.setState({ timeValue: ev.target.value });
            }}
            type="time"
            value={this.state.timeValue}
            step="300"
          />
          <button type="submit" onClick={ this.create }>
            Add Task
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
