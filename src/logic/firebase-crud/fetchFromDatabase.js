import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.

// fetch all items (todos in this case) from database (once, when app is mounted)
// and add them to the store using dispatch:
export default function fetchFromDatabase(
	itemCategoryNameInThePlural, // "todos"
	dispatch
) {
	return onValue(
		ref(database, itemCategoryNameInThePlural),
		(snapshot) => {
			const data = snapshot.val();
			if (data) {
				console.log(
					"DATA WAS FETCHED: ALL USER'S " +
						itemCategoryNameInThePlural.toUpperCase() +
						":",
					data
				);
				// add every fetched todo to the store:
				Object.keys(data).forEach((key) => {
					dispatch({
						type: "add-todo",
						payload: {
							id: key,
							todo: data[key].todo,
						},
					});
				});
			} else {
				console.log(
					"There are no " +
						itemCategoryNameInThePlural +
						" or smth went wrong..."
				);
			}
		},
		{
			onlyOnce: true,
		}
	);
}
