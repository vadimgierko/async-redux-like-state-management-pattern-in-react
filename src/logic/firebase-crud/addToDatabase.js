import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.
// The usual Firebase function would look like the commented function in the bottom of this file.

export default function addToDatabase(
	itemCategoryNameInThePlural, // "todos"
	itemKey, // generated Firebase unique key
	item // that's our todo
) {
	return set(ref(database, itemCategoryNameInThePlural + "/" + itemKey), {
		todo: item,
	})
		.then(() => {
			// when todo is added to database, log success message:
			// (that's optional)
			console.log(
				itemCategoryNameInThePlural +
					" item was successfully added to the database under the key:",
				itemKey
			);
		})
		.catch((error) => alert(error.message));
}

// The function above is written to be reusable
// so it can be tricky to understand it on the first glance.
// If you want to simplify the function above (and maybe understand it better)
// you can use the code below:

/*
export default function addToDatabase(itemKey, item) {
  return set(ref(database, "todos/" + itemKey), {
    todo: item
  })
    .then(() => {
      // when todo is added to database, log success message:
      // (that's optional)
      console.log(
        "todos item was successfully added to the database under the key:",
        itemKey
      );
    })
    .catch((error) => alert(error.message));
}
*/
