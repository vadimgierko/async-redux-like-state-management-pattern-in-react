import { database } from "../../firebaseConfig";
import { ref, push, child } from "firebase/database";

export default function generateFirebaseKeyFor(itemCategoryNameInThePlural) {
	const firebaseKey = push(
		child(ref(database), itemCategoryNameInThePlural)
	).key;

	return firebaseKey;
}
