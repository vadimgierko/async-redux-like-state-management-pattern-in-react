import generateFirebaseKeyFor from "../firebase-crud/generateFirebaseKeyFor";
import addToDatabase from "../firebase-crud/addToDatabase";

export default function addTodo(todo, dispatch) {
	// create a Firebase database key for a new todo:
	const id = generateFirebaseKeyFor("todos");

	if (todo && id) {
		addToDatabase("todos", id, todo).then(() => {
			dispatch({
				type: "add-todo",
				payload: {
					id: id,
					todo: todo,
				},
			});
		});
	}
}
