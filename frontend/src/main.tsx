import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import App from "./app/App";
import i18n from "./app/i18n";
import Client from "./graphql/client";
import { getClerkLocalization } from "./utils/clerkLocalizations";
import { getDateFnsLocale } from "./utils/dateFormatters";
import "./app/i18n";
import "./main.scss";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ClerkProvider
      localization={getClerkLocalization(i18n.language)}
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/home"
      signUpFallbackRedirectUrl="/home"
    >
      <ApolloProvider client={Client}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={getDateFnsLocale(i18n.language)}
        >
          <App />
        </LocalizationProvider>
      </ApolloProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
