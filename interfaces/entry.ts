export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    modifyTo: number;
    duration: string;
    image: string;
    user: string;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';