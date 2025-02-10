import Link from "next/link";

export default function Admin() {
    return (
        <div>
            <h1>Admin Page</h1>
            <Link href="/admin/orgs" className="link-primary">Organizations</Link>
        </div>
    );
};