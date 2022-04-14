import uniqid from "uniqid";

export default function addTodo(todo, dispatch) {
	const id = uniqid();

	return dispatch({
		type: "add-todo",
		payload: {
			id: id,
			todo: todo,
		},
	});
}
