import axios from 'axios';
import { shouldUseMockApi, createMockMeeting } from '../mockData';

const CREATE_MEETING = 'CREATE_MEETING';
const CANCEL_MEETINGS = 'CANCEL_MEETINGS';
const SET_MEETINGS = 'SET_MEETINGS';

export const setMeetings = meetings => {
  return {
    type: SET_MEETINGS,
    meetings,
  }
}

export const createMeeting = meeting => {
  return {
    type: CREATE_MEETING,
    meeting,
  }
}

export const cancelMeetings = () => {
  return {
    type: CANCEL_MEETINGS
  }
}

export const createMeetingThunk = () => dispatch => {
  if (shouldUseMockApi) {
    dispatch(createMeeting(createMockMeeting()));
    return;
  }

  axios.post('http://localhost:4001/api/meetings')
  .then(res => res.data)
  .then(createdMeeting => {
    dispatch(createMeeting(createdMeeting));
  })
  .catch(console.error.bind(console));
}

export const cancelMeetingsThunk = () => dispatch => {
  if (shouldUseMockApi) {
    dispatch(cancelMeetings());
    return;
  }

  axios.delete('http://localhost:4001/api/meetings')
  .then(() => {
    dispatch(cancelMeetings());
  })
  .catch(console.error.bind(console));
}

const initial = [];

export default (initialState = initial, action) => {
  switch(action.type) {
    case CREATE_MEETING:
      const newMeetings = [action.meeting, ...initialState];
      newMeetings.sort((a, b) => { 
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      return newMeetings;
    case CANCEL_MEETINGS:
      return [];
    case SET_MEETINGS:
      return action.meetings;
    default:
      return initialState;
  }
}