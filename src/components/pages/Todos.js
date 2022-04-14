import { useEffect, useState } from "react";

// import useStore custom hook to have the access to the state & dispatch:
import { useStore } from "../../store/Store";

// import CRUD functions from "logic" folder here:
import addTodo from "../../logic/todos-crud/addTodo";
import updateTodo from "../../logic/todos-crud/updateTodo";
import deleteTodo from "../../logic/todos-crud/deleteTodo";

export default function Todos() {
	// here you have the access to the global state
	// and dispatch function you'll pass to CRUD functions
	const { state, dispatch } = useStore();
	// for todo input:
	const [inputValue, setInputValue] = useState("");
	// for todo edition input:
	const [idForEdition, setIdForEdition] = useState();
	const [editedValue, setEditedValue] = useState("");

	function resetInput() {
		setInputValue("");
	}

	useEffect(() => {
		// when todo is chosen for edition
		// set its input value according to its id:
		if (idForEdition) {
			setEditedValue(state.todos[idForEdition]);
		} else {
			setEditedValue("");
		}
	}, [idForEdition, state.todos]);

	// log app state into console after every state change:
	useEffect(() => {
		console.log("app state:", state);
	}, [state]);

	return (
		<div className="todo-page" style={{ textAlign: "center" }}>
			<h1>Your Todos</h1>
			<input
				value={inputValue}
				placeholder="add todo"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				type="button"
				onClick={() => {
					if (inputValue.length) {
						//========== crud logic goes here ===>
						addTodo(inputValue, dispatch);
						resetInput();
					} else {
						alert("You cannot add an empty todo! Type something!");
					}
				}}
			>
				add todo
			</button>
			<ul className="todo-list" style={{ listStyle: "none", paddingLeft: 0 }}>
				{state.todos &&
					Object.keys(state.todos).map((key) => (
						<li key={key} style={{ marginBottom: "1em" }}>
							{idForEdition && idForEdition === key ? (
								<>
									<input
										value={editedValue}
										placeholder="update todo"
										onChange={(e) => setEditedValue(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => {
											if (editedValue.length) {
												//========== crud logic goes here ===>
												updateTodo(key, editedValue, dispatch);
												setIdForEdition();
											} else {
												alert(
													"You cannot update an empty todo! Type something!"
												);
											}
										}}
									>
										update
									</button>
									<button type="button" onClick={() => setIdForEdition()}>
										cancel
									</button>
								</>
							) : (
								<>
									<span style={{ marginRight: "1em" }}>{state.todos[key]}</span>
									<button type="button" onClick={() => setIdForEdition(key)}>
										edit
									</button>
								</>
							)}
							<button
								type="button"
								onClick={() => {
									//========== crud logic goes here ===>
									deleteTodo(key, dispatch);
								}}
							>
								delete
							</button>
						</li>
					))}
			</ul>
		</div>
	);
}
