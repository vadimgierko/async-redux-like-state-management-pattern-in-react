import { database } from "../../firebaseConfig.js";
import { ref, remove } from "firebase/database";

export default function deleteFromDatabase(
	itemCategoryNameInThePlural,
	itemKey
) {
	return remove(
		ref(database, itemCategoryNameInThePlural + "/" + itemKey)
	).then(() =>
		console.log(
			itemCategoryNameInThePlural + " item with the key,",
			itemKey,
			" was successfully deleted from database."
		)
	);
}
