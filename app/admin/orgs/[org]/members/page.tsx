import OrgMemberShow from "./orgMemberShow";

type Props = {
    params: Promise<{
        org: string;
    }>;
};

export default async function Page(props: Props) {
    const params = await props.params;

    return (
        <div>
            <OrgMemberShow org={params.org} />
        </div>
    )
}