# pandata

**Canonical URL:** [https://alexstevovich.com/a/pandata-nodejs](https://alexstevovich.com/a/pandata-nodejs)  
**Software URL:** [https://midnightcitylights.com/software/pandata-nodejs](https://midnightcitylights.com/software/pandata-nodejs)

A Node.js package for managing and manipulating JSON data in memory. This package allows you to easily load, filter, remove, and sort JSON data, providing a simple in-memory data manager for small datasets.

---

## Installation

```sh
npm install pandata
```

## Example

```js
import PanData from 'pandata';

const data = new PanData();

// Load data from a JSON file
await data.loadJson('./data.json');

// Get all items
console.log(data.getAll());

// Get items by key-value pair
console.log(data.getByKeyValue('status', 'active'));

// Get the first item by key-value pair
console.log(data.getFirstByKeyValue('id', 1));

// Remove items by key-value pair
data.removeByKeyValue('status', 'inactive');

// Bubble through all items and apply a function
data.bubble((item) => {
    console.log(item);
});

// Use delegate methods for more flexible filtering
const getByStatus = data.delegateGetAllByKey('status');
console.log(getByStatus('active'));

const getFirstById = data.delegateGetFirstByKey('id');
console.log(getFirstById(1));

const getSortedByDate = data.delegateAllByKeySorted('date');
console.log(getSortedByDate(true)); // Sorted in ascending order
```

## API

### `parse(text)`

Parses JSON data from a string and returns an object containing the parsed data and the content.

| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| text      | string | The full text containing the JSON data. |

**Returns**: `{ data: object, content: string }`

Throws an error if the input is not a string or if the JSON format is invalid.

---

### `serialize(data, content)`

Serializes the data and content into a formatted JSON string.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| data      | object | The JSON data.        |
| content   | string | The document content. |

**Returns**: `string` - The formatted JSON string.

Throws an error if data is not an object or content is not a string.

---

### `clear()`

Clears the current items in the data store.

**Returns**: `this` - The instance itself for chaining.

---

### `getAll()`

Gets all items in the data store.

**Returns**: `array` - All items.

---

### `getByKeyValue(key, value)`

Gets items by key-value pair.

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| key       | string | The key to filter by.           |
| value     | string | The value to match for the key. |

**Returns**: `array` - Items matching the key-value pair.

---

### `getFirstByKeyValue(key, value)`

Gets the first item by key-value pair.

**Returns**: `object` - The first matching item.

---

### `removeByKeyValue(key, value)`

Removes items by key-value pair.

**Returns**: `this` - The instance itself for chaining.

---

### `bubble(fn)`

Applies a function to each item in the data store.

**Returns**: `this` - The instance itself for chaining.

---

### `delegateGetAllByKey(key)`

Delegates filtering items by a specific key.

**Returns**: `function` - A function to call with a value for filtering by key.

---

### `delegateGetFirstByKey(key)`

Delegates finding the first item by a specific key.

**Returns**: `function` - A function to call with a value for finding the first matching item.

---

### `delegateAllByKeySorted(key)`

Delegates sorting items by a specific key.

**Returns**: `function` - A function to call with an optional boolean to sort in ascending or descending order.

---

## Notes

- This package is useful for managing and manipulating small sets of JSON data.
- Minimal and dependency-free.
- Can be used for various in-memory data handling tasks, including filtering, sorting, and delegating operations.

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
