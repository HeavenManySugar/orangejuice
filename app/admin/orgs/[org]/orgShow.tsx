'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import { Repository } from "@/components/Repos/types";
import ShowRepos from "@/components/Repos";

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

type OrgShowProps = {
    org: string;
};

export default function OrgShow({ org }: OrgShowProps) {
    const { data: session } = useSession();

    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<Repository[]>(
        shouldFetch ? [
            `/api/v1/orgs/${org}/repos`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `token ${session?.accessToken}`
                }
            }
        ] : null,
        (args: [RequestInfo, RequestInit?]) => fetcher(...args)
    );

    return (
        <div>
            <h1>Repository Page</h1>
            <ShowRepos data={data!} session={session!} isOrg={true} />
        </div>
    );
}