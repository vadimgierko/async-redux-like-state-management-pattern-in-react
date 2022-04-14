import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

// props are structured in a firebase reference order
export default function addToDatabase(
	itemCategoryNameInThePlural,
	itemKey,
	item
) {
	return set(ref(database, itemCategoryNameInThePlural + "/" + itemKey), {
		todo: item,
	})
		.then(() => {
			console.log(
				itemCategoryNameInThePlural +
					" item was successfully added to the database under the key:",
				itemKey
			);
		})
		.catch((error) => alert(error.message));
}
