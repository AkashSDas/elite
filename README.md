# elite

Elite is an e-commerce application for clothing products with Stripe as payment gateway. Custom roles are provided depending on the level of access, majorly it is categorized into user and admin but can be extended furthur. The frontend is created using Next JS, TypeScript and Material UI. The backend is a collection of REST apis built using Express JS, Mongoose (MongoDB for database) and TypeScript. For uploading images Firebase Storage is used in the backend.

The main project is in `frontend/` and `backend/`. `backend_playground` and `frontend_playground` were just to try different things. The `frontend/` part is incomplete but the remaining part is just making forms and make REST api calls, also the payment system in `frontend/` is not created. The `frontend_playground` is complete, so for payment system in frontend using `Stripe` can be referred. The few differences between `frontend/` and `frontend_playground` are that `frontend/` uses `axios` and `material ui` rather than `fetch api` and `bootstrap` which are used in `frontend_playground/`

**Braintree** payment gateway is used in `frontend_playground` and `backend_playground/`

## Getting started

### backend/

Setup firebase project for this project and get the service account key json file and add it at the root of `backend/` and rename the file to `serviceAccountKey.json` (you can change the name but don't forget to update it in `backend/src/firebase.ts` require statement for serviceAccount)

Create `.env` file in the root of `backend/` and the following env variables

```.env
MONGODB_CONNECT_URL=""
SECRET_KEY=""
STRIPE_SECRET=""
FIREBASE_STORAGE_BUCKET=""
```

Go to terminal and run the following command to start the server

```bash
npm run dev
```

### frontend/

Create `.env.local` in the root of `frontend/` and add the following env variables. Update `NEXT_PUBLIC_BACKEND_API_BASE_URL` if you've changed backend api url.

```.env
NEXT_PUBLIC_BACKEND_API_BASE_URL="http://localhost:8000/api"
NEXT_PUBLIC_STRIPE_KEY=""
```

### backend_playground/

Create `.env` file in the root of `backend_playground/` and the following env variables

```.env
MONGODB_CONNECT_URL=""
SECRET_KEY=""
STRIPE_SECRET=""
BRAINTREE_PUBLIC_KEY=""
BRAINTREE_MERCHANT_ID=""
BRAINTREE_PRIVATE_KEY=""
```

Go to terminal and run the following command to start the server

```bash
npm run dev
```

### frontend_playground/

Follow the steps of `frontend/`

## To do

- Complete the `frontend/` part

## License

[MIT](./LICENSE)
