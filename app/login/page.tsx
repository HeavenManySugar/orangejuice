'use client';

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginPage() {
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
                    <span style={{ userSelect: 'all' }}>token {session.accessToken}</span>
                    <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </>
    )
}