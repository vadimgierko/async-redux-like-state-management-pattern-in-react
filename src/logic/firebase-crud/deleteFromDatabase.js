import { database } from "../../firebaseConfig.js";
import { ref, remove } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.
// The usual Firebase function would look like the commented function in the bottom of this file.

export default function deleteFromDatabase(
	itemCategoryNameInThePlural, // "todos"
	itemKey // Firebase unique key
) {
	return remove(ref(database, itemCategoryNameInThePlural + "/" + itemKey))
		.then(() =>
			// when todo is deleted from database, log success message:
			// (that's optional)
			console.log(
				itemCategoryNameInThePlural + " item with the key,",
				itemKey,
				" was successfully deleted from database."
			)
		)
		.catch((error) => alert(error.message));
}

// The function above is written to be reusable,
// so it can be tricky to understand it on the first glance.
// If you want to simplify the function above (and maybe understand it better)
// you can use the code below:

/*
export default function deleteFromDatabase(itemKey) {
  return remove(ref(database, "todos/" + itemKey))
    .then(() =>
      // when todo is deleted from database, log success message:
      // (that's optional)
      console.log(
        "todo item with the key",
        itemKey,
        "was successfully deleted from database."
      )
    )
    .catch((error) => alert(error.message));
}
*/
