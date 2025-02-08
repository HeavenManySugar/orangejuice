'use client';

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"

function Page() {
    const { data: session, status } = useSession()

    return (
        <>
            {status === "unauthenticated" && (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}
            {status === "authenticated" && session && (
                <>
                    {/* {console.log(session)} */}
                    <p>Signed in as {session?.user?.email} <br /> {session?.user?.name}</p>
                    <img src={session?.user?.image ?? ''} alt={session?.user?.name ?? 'User'} />
                    <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </>
    )
}

export default function LoginPage() {
    return (
        <SessionProvider>
            <Page />
        </SessionProvider>
    )
}