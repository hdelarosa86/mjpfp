import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Tasks extends Component {
    constructor(){
     super();
        this.state ={
            toDoValue:'Title of Task', 
            timeValue: '12:00',
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <form className='form'>

                <input  onChange={ (ev) => {
                    this.setState({toDoValue : ev.target.value})
                    }} type='text' placeholder='Hello'/>

                <input onChange={ (ev) => {
                    this.setState({timeValue : ev.target.value})
                }} type='time'  value={this.state.timeValue} step='300'/>
            </form>
        )
    }
}

export default Tasks