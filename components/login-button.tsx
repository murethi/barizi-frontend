import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {signIn} from "@/auth";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const LoginButton = () => {
    return (
        <Card className={"w-[100vw] sm:w-[75vw] md:w-[50vw]"}>
            <CardHeader>
                <CardTitle>Sign in to Barizi</CardTitle>
                <CardDescription>
                    To continue, login to your preferred Google account.
                </CardDescription>
            </CardHeader>
            <CardContent >
                <form className={"w-full min-h-[20vh] justify-center flex items-center"}
                      action={async () => {
                    "use server"
                    await signIn("google", {
                        callbackUrl: 'http://localhost:3000/api/auth/callback/google'
                    });
                }}>

                    <Button
                        size="lg"
                        className="flex max-w-sm"
                        variant="outline"
                        type={"submit"}
                    >
                        <FcGoogle className="h-5 w-5"/> Sign in With Google
                    </Button>
                </form>
            </CardContent>
        </Card>

    )
        ;
}