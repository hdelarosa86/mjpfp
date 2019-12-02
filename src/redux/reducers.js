import { DAYS_OF_THE_MONTH, GET_MONTH, GET_YEAR } from './constants';
const initialState = {
  year: 0,
  month: 0,
  daysOfTheMonth: [],
  tasks: [],
  task: '',
  timeValue: '12:00',
};

function reducer(state = initialState, action) {
  if (action.type === DAYS_OF_THE_MONTH) {
    state.daysOfTheMonth = action.payload;
  }

  if (action.type === GET_MONTH) {
    state.month = action.payload;
  }

  if (action.type === GET_YEAR) {
    state.year = action.payload;
  }
  console.log('store: ',state)
  return state;
}

export default reducer;
