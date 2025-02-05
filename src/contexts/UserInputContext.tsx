"use client";

import { SelectedCountryType, UserInputDataType } from "@/utils/types";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type StateType = UserInputDataType & {
  regionList: SelectedCountryType[];
};

// Define action types
type Action =
  | { type: "UPDATE_FIELD"; payload: { name: string; value: number | string } }
  | { type: "UPDATE_REGION_LIST"; payload: { value: SelectedCountryType[] } };

// Initial state
const initialState: StateType = {
  firstName: "",
  employeeCount: 5000,
  hybridPercentage: 50,
  locations: 5,
  countries: 2,
  hostingSites: 1,
  countryName: "",
  regionList: [],
  acceleration: 1,
};

// Reducer function
const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "UPDATE_REGION_LIST":
      return {
        ...state,
        regionList: action.payload.value,
      };
    default:
      return state;
  }
};

// Define the context type
interface UserInputContextType {
  state: StateType;
  // changeHandler: (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => void;
  dispatch: React.ActionDispatch<[action: Action]>;
}

// Create context
const UserInputContext = createContext<UserInputContextType | undefined>(
  undefined,
);

// Provider component
export default function UserInputContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchListsData() {
      try {
        const res = await fetch("/api/countryList");
        if (!res.ok)
          throw new Error(`Error ${res.status}: Failed to fetch lists data`);
        const json = await res.json();

        if (json.listsData && json.listsData.length > 0) {
          dispatch({
            type: "UPDATE_FIELD",
            payload: {
              name: "countryName",
              value: json.listsData[0]?.country || "",
            },
          });

          dispatch({
            type: "UPDATE_REGION_LIST",
            payload: { value: json.listsData },
          });
        }
      } catch (err) {
        throw new Error(`Error ${err}: Failed to fetch lists data`);
      }
    }

    fetchListsData();
  }, []);

  return (
    <UserInputContext.Provider value={{ state, dispatch }}>
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
