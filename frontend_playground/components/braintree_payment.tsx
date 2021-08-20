import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../lib/auth";
import { getToken } from "../lib/braintree_payment";

function BraintreePayment({
  products,
  setReload = (func) => func,
  reload = undefined,
}) {
  const [info, setInfo] = useState<any>({
    loading: false,
    success: false,
    clientToken: null,
    error: false,
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  // Why we shouldn't use helper function directly in useEffect?
  // The reason is because that helper function lives in some other
  // folder and it might happen is that it will keep on calling again
  // and again, so safe way is to define our function here which calls
  // that helper function and then use it here

  const getAToken = async (userId, token) => {
    const [res, err] = await getToken(userId, token);

    if (res?.error) {
      setInfo({ ...res, error: res.error });
    } else {
      const clientToken = res.clientToken;
      setInfo({ ...res, clientToken });
    }
  };

  useEffect(() => {
    getAToken(userId, token);
  }, []);

  const showDropIn = () => {
    if (info.clientToken !== null && products.length > 0)
      return (
        <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            // onInstance={(instance) => (info.instance = instance)}
            onInstance={(instance) => {
              setInfo({ ...info, instance });
            }}
          />
          <button
            className="btn btn-success text-white px-5 btn-lg"
            onClick={() => {}}
          >
            Pay
          </button>
        </div>
      );

    return <h2>Login</h2>;
  };

  return <section>{showDropIn()}</section>;
}

export default BraintreePayment;
