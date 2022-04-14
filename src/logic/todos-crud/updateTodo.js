export default function updateTodo(id, updatedTodo, dispatch) {
	return dispatch({
		type: "update-todo",
		payload: {
			id: id,
			todo: updatedTodo,
		},
	});
}
