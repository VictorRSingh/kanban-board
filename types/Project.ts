
export type Project = {
    id: string;
    owner: string;
    title: string;
    visibility: PROJECT_VISIBILITY;
}

enum PROJECT_VISIBILITY {
    PUBLIC,
    PRIVATE
}