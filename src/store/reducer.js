import { INIT_STATE } from "./initState";

export default function reducer(state, action) {
	switch (action.type) {
		case "add-todo":
			return {
				...state,
				todos: {
					...state.todos,
					[action.payload.id]: action.payload.todo,
				},
			};
		case "update-todo":
			return {
				...state,
				todos: {
					...state.todos,
					[action.payload.id]: action.payload.todo,
				},
			};
		case "delete-todo":
			let updatedTodos = { ...state.todos };
			if (updatedTodos[action.payload.id]) {
				delete updatedTodos[action.payload.id];
			}
			return {
				...state,
				todos: updatedTodos,
			};
		case "reset-state":
			return INIT_STATE;
		default:
			return state;
	}
}
