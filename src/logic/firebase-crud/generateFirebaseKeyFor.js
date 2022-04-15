import { database } from "../../firebaseConfig";
import { ref, push, child } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.

// generate Firebase unique key for the item:
export default function generateFirebaseKeyFor(itemCategoryNameInThePlural) {
	const firebaseKey = push(
		child(ref(database), itemCategoryNameInThePlural)
	).key;

	return firebaseKey;
}
