export type TokenType = string;

export interface ICredentials {
    email?: string | undefined
    password?: string | undefined
    provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined
}

export interface ILoginViewDatas {
    loading: boolean,
    email: string
}