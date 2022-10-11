import { loadStripe } from "@stripe/stripe-js";
console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51KwHZgI1teed53AjYkakOEr36TpUrz5i3m1AzRNsve60Xbkb7gOdUAz0r4mrluHGR9PNYkIJ3Jg5vPgG8UVVIziv00ZnRhM1UX"
);
