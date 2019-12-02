import { DAYS_OF_THE_MONTH, GET_MONTH, GET_YEAR } from './constants';

export function getDays(payload) {
  return {
    type: DAYS_OF_THE_MONTH,
    payload,
  };
}

export function getMonth(payload) {
  return {
    type: GET_MONTH,
    payload,
  };
}

export function getYear(payload) {
  return {
    type: GET_YEAR,
    payload,
  };
}