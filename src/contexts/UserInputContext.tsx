"use client";

import { SelectedCountryType, UserInputDataType } from "@/utils/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

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

const errorState = {
  employeeCount: "",
  locations: "",
  hostingSites: "",
};

type ErrorType = {
  employeeCount: string;
  locations: string;
  hostingSites: string;
};

type InputChangeHandlerOptionType = {
  min?: number;
  max?: number;
  isNumber?: boolean;
  message?: string;
};

// Define the context type
interface UserInputContextType {
  state: StateType;
  inputChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: InputChangeHandlerOptionType,
  ) => void;
  dispatch: React.ActionDispatch<[action: Action]>;
  error: ErrorType;
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
  const [error, setError] = useState(errorState);

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
