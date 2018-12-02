import {
  FETCH_STUDENTS,
  ADD_STUDENT,
  SET_STAGE,
  SET_DIVISION,
  FIND_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from "./types";

export const createStudent = newStudent => dispatch => {
  fetch("http://localhost:8006/students", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newStudent)
  })
    .then(res => res.json())
    .then(student => {
      dispatch({ type: ADD_STUDENT, payload: student });
    });
};

export const fetchStudents = () => dispatch => {
  fetch("http://localhost:8006/students")
    .then(res => res.json())
    .then(students => dispatch({ type: FETCH_STUDENTS, payload: students }));
};

export const setStage = stage => dispatch => {
  dispatch({ type: SET_STAGE, payload: stage });
};

export const setDivision = division => dispatch => {
  dispatch({ type: SET_DIVISION, payload: division });
};

export const findStudent = search => dispatch => {
  fetch("http://localhost:8006/students?search=" + search)
    .then(res => res.json())
    .then(students => dispatch({ type: FIND_STUDENT, payload: students }));
};

export const updateStudent = updatedStudent => dispatch => {
  fetch("http://localhost:8006/students/" + updatedStudent.id, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(updatedStudent)
  })
    .then(res => res.json())
    .then(student => {
      dispatch({ type: UPDATE_STUDENT, payload: student });
    });
};

export const deleteStudent = id => dispatch => {
  fetch("http://localhost:8006/students/" + id, {
    method: "DELETE"
  }).then(message =>
    dispatch({ type: DELETE_STUDENT, payload: { message, id } })
  );
};
