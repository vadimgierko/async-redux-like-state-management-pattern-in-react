import deleteFromDatabase from "../firebase-crud/deleteFromDatabase";

export default function deleteTodo(id, dispatch) {
	return deleteFromDatabase("todos", id).then(() => {
		return dispatch({
			type: "delete-todo",
			payload: {
				id: id,
			},
		});
	});
}
