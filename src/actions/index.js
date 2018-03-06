export const GET_GROUP = 'GET_GROUP';

export function getGroup() {
  return {
    type: GET_GROUP,
    payload: {
      school: '',
      courseNumber: '',
      courseTitle: '',
      instructor: '',
      meetingTimes: ''
    }
  }
}