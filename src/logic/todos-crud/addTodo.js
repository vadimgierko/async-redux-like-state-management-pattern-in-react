import generateFirebaseKeyFor from "../firebase-crud/generateFirebaseKeyFor";
import addToDatabase from "../firebase-crud/addToDatabase";

export default function addTodo(todo, dispatch) {
	// create a Firebase database key for a new todo:
	const id = generateFirebaseKeyFor("todos");

	if (todo && id) {
		return addToDatabase("todos", id, todo).then(() => {
			return dispatch({
				type: "add-todo",
				payload: {
					id: id,
					todo: todo,
				},
			});
		});
	} else {
		alert(
			"Error occured: there is no todo data passed or the unique key wasn't generated... Try again!"
		);
	}
}
