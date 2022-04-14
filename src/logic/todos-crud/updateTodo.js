import addToDatabase from "../firebase-crud/addToDatabase";

export default function updateTodo(id, updatedTodo, dispatch) {
	return addToDatabase("todos", id, updatedTodo).then(() => {
		return dispatch({
			type: "update-todo",
			payload: {
				id: id,
				todo: updatedTodo,
			},
		});
	});
}
