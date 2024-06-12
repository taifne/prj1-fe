export type Policy = {
    id?: string
    name: string
    description: null | string
    createdAt: string
    policy: {
        actions?: string | string[]
        resources?: string | string[]
    }
}