import { tcbRequest } from '@/utils'

export interface Options {
    page?: number
    pageSize?: number

    filter?: {
        projectId: string
        _id?: string
        ids?: string[]
        [key: string]: any
    }

    fuzzyFilter?: {
        [key: string]: string
    }

    sort?: {
        [key: string]: 'ascend' | 'descend' | null
    }

    payload: Record<string, any>
}

export const getWebhooks = async (options?: Partial<Options>) => {
    return tcbRequest('/api/webhook', {
        method: 'POST',
        data: {
            options,
            action: 'getMany',
        },
    })
}

export const createWebhook = async (options?: Partial<Options>) => {
    return tcbRequest('/api/webhook', {
        method: 'POST',
        data: {
            options,
            action: 'createOne',
        },
    })
}

export const updateWebhook = async (options?: Partial<Options>) => {
    return tcbRequest('/api/webhook', {
        method: 'POST',
        data: {
            options,
            action: 'updateOne',
        },
    })
}

export const deleteWebhook = async (options?: Partial<Options>) => {
    return tcbRequest('/api/webhook', {
        method: 'POST',
        data: {
            options,
            action: 'deleteOne',
        },
    })
}
