# People Record Table

This project is built with Vite, React, TypeScript and Tailwind CSS. Deployed at https://people-record-table.netlify.app/.

## Running the project

```
yarn install
yarn dev
```
## Features implemented

- Table of people records
- Pagination
- Row expander for additional details
- Changing the number of rows per page
- Sorting by column

## Design decisions and Todos

To prepare for additional features like editing columns shown or filtering, the table column is defined dynamically as a list of objects, each with its own `sort` and `formatter` functions. This allows columns to be easily added or removed, different types of data can also be displayed and sorted dynamically by passing customised functions.

Given more time, the component can be further improved by refactoring the sorting and slicing logic into a custom hook, making it more readable and reusable. The pagination can be implemented as buttons instead of a dropdown for better UX if it's preferred. The table can also be made more accessible by adding keyboard navigation.