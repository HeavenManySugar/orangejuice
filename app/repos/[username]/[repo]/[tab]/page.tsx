import PageClient from "../pageClient";

type Props = {
    params: Promise<{
        username: string;
        repo: string;
        tab: string
    }>;
};

export default async function Page(props: Props) {
    const params = await props.params;

    return (
        <div>
            <PageClient username={params.username} repo={params.repo} tab={params.tab} />
        </div>
    )
}