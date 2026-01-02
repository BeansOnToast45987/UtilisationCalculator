import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import "./SignInTemplate.scss";

export default function SignInTemplate() {
  return (
    <div className="signin-container">
      <ClerkSignIn signUpUrl="/sign-up" />
    </div>
  );
}
