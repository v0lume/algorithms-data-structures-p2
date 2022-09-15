export interface IJob {
    name: string;
    description?: string;
    run(): void;
}
