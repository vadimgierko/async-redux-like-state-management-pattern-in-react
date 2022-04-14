export default function deleteTodo(id, dispatch) {
	return dispatch({
		type: "delete-todo",
		payload: {
			id: id,
		},
	});
}
