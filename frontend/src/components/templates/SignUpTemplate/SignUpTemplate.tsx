import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import "./SignUpTemplate.scss";

export default function SignUpTemplate() {
  return (
    <div className="signup-container">
      <ClerkSignUp signInUrl="/sign-in" />
    </div>
  );
}
