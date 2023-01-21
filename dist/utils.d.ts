export declare const KEY = "streak";
export declare function formattedDate(date: Date): string;
export interface Streak {
    currentCount: number;
    startDate: string;
    lastLoginDate: string;
}
export declare function buildStack(date: Date, overrideDefaults?: Partial<Streak>): Streak;
export declare function updateStreak(storage: Storage, streak: Streak): void;
