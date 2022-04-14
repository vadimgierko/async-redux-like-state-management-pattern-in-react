import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer.js";
import { INIT_STATE } from "./initState.js";
import fetchFromDatabase from "../logic/firebase-crud/fetchFromDatabase";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);

	useEffect(() => {
		// fetch all todos from database:
		fetchFromDatabase("todos", dispatch);
	}, []);

	const value = {
		state,
		dispatch,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}
