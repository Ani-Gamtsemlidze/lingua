import SignupPage from "@/components/signupPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async  function signup() {
  const session = await getServerSession();
    if (session) {
      redirect("/dashboard");
    }
  return <SignupPage />;
}
