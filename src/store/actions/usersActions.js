import { GET_USERS, ADD_USER, REMOVE_USER } from "../constants/constants";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const removeUser = (id) => {
  return {
    type: REMOVE_USER,
    payload: id,
  };
};

export const getUsersAction = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin": "*",
      },
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(getUsers(data));
  };
};

export const addUserAction = (formData) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(addUser(data));
  };
};

export const removeUserAction = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3000/users/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeUser(id));
    }
  };
};
