import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import { INIT_STATE } from "./initState.js";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);

	const value = {
		state,
		dispatch,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}
