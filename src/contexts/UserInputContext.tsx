"use client";

import React, { createContext, useContext, useReducer, useState } from "react";

import { UserInputDataType } from "@/utils/types";

type StateType = UserInputDataType;

type ActionType = {
  type: "UPDATE_FIELD";
  payload: { name: string; value: number | string | Date | boolean };
};

const initialState = {
  userId: "",
  firstName: "",
  emailAddress: "",
  businessPhone: "",
  companyName: "",
  jobTitle: "",
  submissionDate: "",
  region: "",
  totalEmployees: 0,
  hybridPercentage: 25,
  locations: 0,
  countries: 2,
  hostingSites: 0,
  countryName: "",
  acceleration: 0,
  demoRequest: 0,
  userConsent: 0,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

const errorState = {
  totalEmployees: "",
  locations: "",
  hostingSites: "",
};

type ErrorType = {
  totalEmployees: string;
  locations: string;
  hostingSites: string;
};

type InputChangeHandlerOptionType = {
  min?: number;
  max?: number;
  isNumber?: boolean;
  message?: string;
};

interface UserInputContextType {
  state: StateType;
  inputChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: InputChangeHandlerOptionType,
  ) => void;
  dispatch: React.ActionDispatch<[action: ActionType]>;
  error: ErrorType;
}

const UserInputContext = createContext<UserInputContextType | undefined>(
  undefined,
);

export default function UserInputContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(errorState);

  function inputChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: {
      min?: number;
      max?: number;
      isNumber?: boolean;
      message?: string;
    },
  ) {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (options?.isNumber) {
      parsedValue = Number(value);
      if (
        isNaN(parsedValue) ||
        (options.min !== undefined && parsedValue < options.min) ||
        (options.max !== undefined && parsedValue > options.max)
      ) {
        setError((prev) => ({ ...prev, [name]: options.message }));
        return;
      }
    }

    setError((prev) => ({ ...prev, [name]: "" }));
    dispatch({ type: "UPDATE_FIELD", payload: { name, value: parsedValue } });
  }

  return (
    <UserInputContext.Provider
      value={{ state, dispatch, error, inputChangeHandler }}
    >
      {children}
    </UserInputContext.Provider>
  );
}

export function useUserInputContext() {
  const context = useContext(UserInputContext);

  if (!context) {
    throw new Error(
      "useUserInputContext must be used within a UserInputContextProvider",
    );
  }

  return context;
}
