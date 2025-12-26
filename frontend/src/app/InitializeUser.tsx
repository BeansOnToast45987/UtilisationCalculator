import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useInitializeUser, Country } from "../graphql/index";
import { getCurrentUserCountry } from "../utils/countryMapping";
import i18n from "./i18n";

const InitializeUser: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { initializeUser, initializeUserLoading, initializeUserError } =
    useInitializeUser();
  const [hasInitialized, setHasInitialized] = useState(false);
  const userCountry = getCurrentUserCountry(i18n.language);

  useEffect(() => {
    if (initializeUserError) {
      console.error("Failed to initialize user:", initializeUserError.message);
    }
  }, [initializeUserError]);

  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      user &&
      !hasInitialized &&
      !initializeUserLoading
    ) {
      initializeUser({
        clerkId: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        name: user.fullName || "",
        country: userCountry as Country,
      }).then(() => {
        setHasInitialized(true);
      });
    }
  }, [
    isLoaded,
    isSignedIn,
    user,
    hasInitialized,
    initializeUser,
    userCountry,
    initializeUserLoading,
  ]);

  return null;
};

export { InitializeUser };
