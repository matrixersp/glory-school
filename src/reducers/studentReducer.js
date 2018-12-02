import {
  FETCH_STUDENTS,
  ADD_STUDENT,
  SET_STAGE,
  SET_DIVISION,
  FIND_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  stage: "",
  division: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STUDENTS:
      return { ...state, items: payload };
    case ADD_STUDENT:
      return { ...state, item: payload };
    case SET_STAGE:
      return { ...state, stage: payload };
    case SET_DIVISION:
      return { ...state, division: payload };
    case FIND_STUDENT:
      return { ...state, items: payload };
    case UPDATE_STUDENT:
      return { ...state, item: payload };
    case DELETE_STUDENT:
      let newItems = state.items.filter(student => student.id !== payload.id);
      return { ...state, items: newItems };
    default:
      return state;
  }
};
