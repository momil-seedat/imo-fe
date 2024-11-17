import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  user: null, // You can set this to the initial user data or null
};

// Define actions
const SET_USER = 'SET_USER';

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

// Create the context
const UserContext = createContext();

// Context provider component
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Define a function to set the user data
  const setUser = (user) => {
    dispatch({ type: SET_USER, user });
  };

  return (
    <UserContext.Provider value={{ user: state.user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUserContext };
