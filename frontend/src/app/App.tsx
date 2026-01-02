import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { CustomLoader, CustomTypography } from "../components/atoms/index";
import { HomePage, SignInPage, SignUpPage } from "../components/pages/index";
import { InitializeUser } from "./InitializeUser";
import "./App.scss";

const App: React.FC = () => {
  const { isLoaded } = useAuth();
  const { t } = useTranslation();

  if (!isLoaded) {
    return (
      <div className="app-container">
        <div className="app-layout">
          <CustomLoader size={75} />
          <CustomTypography variant="body1" color="black">
            {t("app.loading")}
          </CustomTypography>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <SignedIn>
        <InitializeUser />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </SignedOut>
    </Router>
  );
};

export default App;
