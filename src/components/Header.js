import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  const month = [
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
  return <h1>{`${month[props.month]} ${props.year}`}</h1>;
};

export default Header;
