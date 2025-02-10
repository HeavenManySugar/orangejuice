export type ExternalTracker = {
    external_tracker_format: string;
    external_tracker_regexp_pattern: string;
    external_tracker_style: string;
    external_tracker_url: string;
};

export type ExternalWiki = {
    external_wiki_url: string;
};

export type InternalTracker = {
    allow_only_contributors_to_track_time: boolean;
    enable_issue_dependencies: boolean;
    enable_time_tracker: boolean;
};

export type Owner = {
    active: boolean;
    avatar_url: string;
    created: string;
    description: string;
    email: string;
    followers_count: number;
    following_count: number;
    full_name: string;
    html_url: string;
    id: number;
    is_admin: boolean;
    language: string;
    last_login: string;
    location: string;
    login: string;
    login_name: string;
    prohibit_login: boolean;
    restricted: boolean;
    source_id: number;
    starred_repos_count: number;
    visibility: string;
    website: string;
};

export type Permissions = {
    admin: boolean;
    pull: boolean;
    push: boolean;
};

export type Organization = {
    avatar_url: string;
    description: string;
    email: string;
    full_name: string;
    id: number;
    location: string;
    name: string;
    repo_admin_change_team_access: boolean;
    username: string;
    visibility: string;
    website: string;
};

export type Team = {
    can_create_org_repo: boolean;
    description: string;
    id: number;
    includes_all_repositories: boolean;
    name: string;
    organization: Organization;
    permission: string;
    units: string[];
    units_map: { [key: string]: string };
};

export type RepoTransfer = {
    doer: Owner;
    recipient: Owner;
    teams: Team[];
};

export type Repository = {
    allow_fast_forward_only_merge: boolean;
    allow_merge_commits: boolean;
    allow_rebase: boolean;
    allow_rebase_explicit: boolean;
    allow_rebase_update: boolean;
    allow_squash_merge: boolean;
    archived: boolean;
    archived_at: string;
    avatar_url: string;
    clone_url: string;
    created_at: string;
    default_allow_maintainer_edit: boolean;
    default_branch: string;
    default_delete_branch_after_merge: boolean;
    default_merge_style: string;
    description: string;
    empty: boolean;
    external_tracker: ExternalTracker;
    external_wiki: ExternalWiki;
    fork: boolean;
    forks_count: number;
    full_name: string;
    has_actions: boolean;
    has_issues: boolean;
    has_packages: boolean;
    has_projects: boolean;
    has_pull_requests: boolean;
    has_releases: boolean;
    has_wiki: boolean;
    html_url: string;
    id: number;
    ignore_whitespace_conflicts: boolean;
    internal: boolean;
    internal_tracker: InternalTracker;
    language: string;
    languages_url: string;
    link: string;
    mirror: boolean;
    mirror_interval: string;
    mirror_updated: string;
    name: string;
    object_format_name: string;
    open_issues_count: number;
    open_pr_counter: number;
    original_url: string;
    owner: Owner;
    parent: string;
    permissions: Permissions;
    private: boolean;
    projects_mode: string;
    release_counter: number;
    repo_transfer: RepoTransfer;
    size: number;
    ssh_url: string;
    stars_count: number;
    template: boolean;
    updated_at: string;
    url: string;
    watchers_count: number;
    website: string;
};

