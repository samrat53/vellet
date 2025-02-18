import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./config/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if(session?.user) {
    redirect('/dashboard');
  }
  else {
    redirect('/api/auth/signin')
  }
}
