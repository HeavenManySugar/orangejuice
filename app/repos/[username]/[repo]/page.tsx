import RepoShow from "./repoShow";

type Props = {
    params: Promise<{
        username: string;
        repo: string;
    }>;
};

export default async function Page(props: Props) {
    const params = await props.params;

    return (
        <div>
            <p>Post: {params.repo}</p>
            <RepoShow username={params.username} repo={params.repo} />
        </div>
    )
}