# Task

Build a ticket managing app, where the user can _add_, _filter_ (by status), _assign_, and _complete_ tickets

## Approach

1. Read documentation (nx in particular), review existing code, review package.json, etc.
2. Create my own repo and clone it.
4. Decide on supporting libraries, if any (Formik, Yup, Tailwindcss, etc.).
5. Install supporting libraries.

## Tasks

- update readme? (remove instructions and replace with instructions for running this repo)
- List and detail views
    - Feature Enhancement: Apply layout:
        - 4 column layout:
            - completed
            - description
            - assigned to
            - edit/delete
- add
    - add Add Ticket form to top of list view
    - enable Add Ticket form
- complete
    - clicking the completion status on the main list toggles the status
- assign
- filter

## Notes

- I was expecting to be able to create and assign a ticket in the same form, but the backend doesn't support this. I'm not sure if this is a bug or a feature.

## Pair Programming Tasks

- Add global state management (instead of prop drilling, see setTickets as an example, kind of annoying)
- Mock interfaces, not internals (move the fetch() calls into a custom hook)
- Improve layout design
- Add a Users screen that shows all the tickets assigned to a user
- Add some cypress tests to test functionality (add, complete, assign, filter)