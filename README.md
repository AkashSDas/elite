# elite

Elite is an e-commerce application for clothing products with Stripe as payment gateway. Custom roles are provided depending on the level of access, majorly it is categorized into user and admin but can be extended furthur. The frontend is created using Next JS, TypeScript and Material UI. The backend is a collection of REST apis built using Express JS, Mongoose (MongoDB for database) and TypeScript.

The main project is in `frontend/` and `backend/`. `backend_playground` and `frontend_playground` were just to try different things. The `frontend/` part is incomplete but the remaining part is just making forms and make REST api calls, also the payment system in `frontend/` is not created. The `frontend_playground` is complete, so for payment system in frontend using `Stripe` can be referred. The few differences between `frontend/` and `frontend_playground` are that `frontend/` uses `axios` and `material ui` rather than `fetch api` and `bootstrap` which are used in `frontend_playground/`

**Braintree** payment gateway is used in `frontend_playground` and `backend_playground/`

## To do

- Complete the `frontend/` part

## License

[MIT](./LICENSE)
