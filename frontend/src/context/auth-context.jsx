import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

export const authContext = createContext();

/**
 * Reducer function for handling authentication actions
 * @param {Object} state - The current state
 * @param {Object} action - The action to be performed
 * @returns {Object} - The new state after performing the action
 */
const authReducer = (state, action) => {
  switch (action.type) {
    // Set user, role, and token to null on login start
    case "LOGIN_START":
      return { user: null, role: null, token: null };
    // Set user, role, and token based on the payload on login success
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    // Set user, role, and token to null on logout
    case "LOGOUT":
      return { user: null, role: null, token: null };
    // Return current state for unknown action types
    default:
      return state;
  }
};

/**
 * AuthContextProvider component to provide authentication context
 * @param {object} props - The children components
 */
const AuthContextProvider = ({ children }) => {
  // Initialize state and dispatch using useReducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Save user, token, and role to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  // Provide user, token, role, and dispatch to children components
  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
