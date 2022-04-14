import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function fetchFromDatabase(
	itemCategoryNameInThePlural,
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
