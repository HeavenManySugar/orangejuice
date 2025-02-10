import React from "react";
import { Repository } from "@/components/ShowRepos/types";
import Link from "next/link";
import { GoRepo, GoRepoForked } from "react-icons/go";
import { Session } from "next-auth";

export default function ShowRepos({ data, session, isOrg }: { data: Repository[]; session: Session, isOrg?: boolean }) {
    return <>
        {data && Array.isArray(data) && data.map((repo: Repository) =>
        (isOrg || (session && (session.user?.id == repo.owner.id)) ? (
            <div key={repo.id} className="card lg:card-side bg-base-100 shadow-xl my-2">
                <div className="flex items-center my-3">
                    <div className="mx-4">
                        <figure>
                            {repo.fork ? (
                                <GoRepoForked size={24} />
                            ) : (
                                <GoRepo size={24} />
                            )}
                        </figure>
                    </div>
                    <div className="card-body p-0">
                        <Link href={`/repos/${repo.owner.login}/${repo.name}`} className="card-title link-primary">
                            {repo.name}
                        </Link>
                        <p>更新於 {new Date(repo.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        ) : null)
        )}
    </>
}