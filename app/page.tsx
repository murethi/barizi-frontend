import {auth} from "@/auth";
import {LoginButton} from "@/components/login-button";


export default async function Home() {
  const session = await auth();


  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <LoginButton/>
      </main>
  );
}
