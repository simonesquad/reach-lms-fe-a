import {
  ADD_COURSE,
  SEARCH_COURSE,
  SET_EDIT,
  DELETE_COURSE,
  EDIT_COURSE,
  SET_COURSE_LIST,
  FILTER_STATE,
  CLEAR_COURSES,
} from '../actions/courseActions';

const initialState = {
  search_courses: [],
  courses_list: [],
  edit_course: {},
  filtered_course_list: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      console.log(action.payload);
      if (state.courses_list === false) {
        return { ...state, courses_list: [action.payload] };
      } else {
        return {
          ...state,
          courses_list: [...state.courses_list, action.payload],
        };
      }
    case SEARCH_COURSE:
      function filterResults() {
        const inputCopy = { ...action.payload.search_input };
        let results = action.payload.results;
        for (let i in inputCopy) {
          //deletes keys in fields that were left empty
          if (!inputCopy[i]) {
            delete inputCopy[i];
          }
        }
        let filteredResults = results.filter(el => {
          const keys = Object.keys(inputCopy);
          for (let i in keys) {
            if (el[keys[i]] !== inputCopy[keys[i]]) {
              return false;
            }
          }
          return true;
        });
        return filteredResults ? filteredResults : results;
      }
      let results = filterResults();
      return { ...state, search_courses: results };
    case SET_EDIT:
      return { ...state, edit_course: action.payload };
    case DELETE_COURSE:
      let newCourseList = [...state.courses_list].filter(item => {
        return item.courseid !== action.payload;
      });
      return { ...state, courses_list: newCourseList };
    case EDIT_COURSE:
      let updatedCourses = [...state.courses_list];
      let index2 = updatedCourses.findIndex(el => el.id === action.payload.id);
      updatedCourses.splice(index2, 1, action.payload);
      return { ...state, courses_list: updatedCourses };
    case SET_COURSE_LIST:
      return { ...state, courses_list: action.payload };
    case FILTER_STATE:
      console.log('action.payload', action.payload);
      return { ...state, filtered_course_list: action.payload };
    case CLEAR_COURSES:
      return initialState;
    default:
      return state;
  }
};

export default courseReducer;
