import { oktaConfig } from "@/auth/oktaConfig";
import LoginWidget from "./LoginWidget";

export default function LoginPage() {
  return (
    <LoginWidget config={oktaConfig} />
  );
}
