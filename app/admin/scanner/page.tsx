import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ScannerClient from "./ScannerClient";

export default function ScannerPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("nexor_admin_token");

  // Secure route protection
  if (token?.value !== "authenticated") {
    // Redirect unauthenticated users back to events page
    redirect("/events");
  }

  return <ScannerClient />;
}
