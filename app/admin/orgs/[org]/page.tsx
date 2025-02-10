import OrgShow from "./orgShow";

type Props = {
    params: Promise<{
        org: string;
    }>;
};

export default async function Page(props: Props) {
    const params = await props.params;

    return (
        <div>
            <OrgShow org={params.org} />
        </div>
    )
}