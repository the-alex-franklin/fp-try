# fp-try

A simple TypeScript utility function for handling synchronous and asynchronous
operations with a consistent result format.

## Why Use Try?

When working with synchronous or asynchronous operations in TypeScript, it's
common to encounter errors that need to be handled gracefully. The `Try`
function provides a convenient way to wrap these operations and handle errors in
a consistent manner.

By using `Try`, you can:

- Avoid cluttering your code with `try`/`catch` blocks.
- Handle synchronous and asynchronous operations with the same function.
- Get a consistent result format (`Success` or `Failure`) for easy error
  handling.

## Usage

```typescript
import { Try } from "jsr:@2or3godzillas/fp-try";

const syncResult = Try(() => {
  // some task that might throw
  return "Hello, world!";
});

if (syncResult.success) console.log(syncResult.data);
else console.error(syncResult.error);

const asyncResult = await Try(() => {
  return fetch("https://api.example.com/data")
    .then((response) => response.json());
});

if (asyncResult.success) console.log(asyncResult.data);
else console.error(asyncResult.error);
```

The `Try` function takes a callback that contains your synchronous or
asynchronous operation. It returns a `Success` object if the operation completes
successfully, or a `Failure` object if an error occurs.

## Result Format

The `Try` function returns a result object with the following properties:

- `success`: A boolean indicating whether the operation succeeded (`true`) or
  failed (`false`).
- `failure`: A boolean indicating whether the operation failed (`true`) or
  succeeded (`false`).
- `data`: The result of the operation if it succeeded.
- `error`: The error object if the operation failed.

You can easily check the `success` or `failure` property to determine the
outcome of the operation and handle the result accordingly.

## Error Handling

If an error occurs during the operation, the `Try` function captures it and
returns a `Failure` object. If the error is an instance of the `Error` class, it
is directly assigned to the `error` property. Otherwise, the error is
stringified using `JSON.stringify()` and wrapped in a new `Error` object.

## License

This utility is licensed under the [MIT License](LICENSE).
