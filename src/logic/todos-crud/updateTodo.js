import addToDatabase from "../firebase-crud/addToDatabase";

export default function updateTodo(id, updatedTodo, dispatch) {
	if (updateTodo) {
		return addToDatabase("todos", id, updatedTodo).then(() => {
			return dispatch({
				type: "update-todo",
				payload: {
					id: id,
					todo: updatedTodo,
				},
			});
		});
	} else {
		alert("Error occured: there is no todo data passed... Try again!");
	}
}
