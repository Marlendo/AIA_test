// management state using hooks and provider with react tracked help
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);

export const { Provider, useTracked, useTrackedState, useUpdate } = createContainer(useValue);
export const initialState = {
    alert: {
      active: false,
      type: '',
      message: '',      
    },
    loading: false,
    favorite: []
  };

export const reducer = (state, action) => {
    switch (action.type) {
      case 'errorAlert': return { ...state, alert: {active: true, type: action.snackbarType ? action.snackbarType : 'Error', message: action.message} };
      case 'successAlert': return { ...state, alert: {active: true, type: 'success', message: action.message ? action.message : 'Success' } };
      case 'closeAlert': return { ...state, alert: {...state.alert, active: false} };
      case 'loadStart': return { ...state, loading: true };
      case 'loadStop': return { ...state, loading: false };            
      case 'setFavorite': return { ...state, favorite: action.data };            
      default: throw new Error(`unknown action type: ${action.type}`);
    }
  };
