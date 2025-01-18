'use client';

import React, {  createContext, useContext, useReducer } from 'react';
import { regionData } from '@/utils/constants';


interface State {
  employeeCount: number;
  hybridPercentage: number;
  locations: number;
  countries: number;
  hostingSites: number;
  countryName: string;
  acceleration: number;
}

type Action = {
  type: 'UPDATE_FIELD';
  payload: { name: string; value: number | string };
};

const initialState = {
  employeeCount: 5000,
  hybridPercentage: 50,
  locations: 5,
  countries: 2,
  hostingSites: 1,
  countryName: regionData[0].name,
  acceleration: 1,
};


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

interface UserInputContextType {
  state: State;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}


const UserInputContext = createContext<UserInputContextType | undefined>(undefined);

export default function UserInputContextProvider({ children }: { children: React.ReactNode }) {
 const [state, dispatch] = useReducer(reducer, initialState);

 const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'countryName') {
      dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    } else {
      dispatch({ type: 'UPDATE_FIELD', payload: { name, value: Number(value) } });
    }
    
  };

  return (
    <UserInputContext.Provider value={{ state, changeHandler }}>
      {children}
    </UserInputContext.Provider>
  );
}

export function useUserInputContext() {
  const context = useContext(UserInputContext);

  if (!context) {
    throw new Error('UserInputContext must be used within a UserInputContextProvider');
  }

  return context;
}
