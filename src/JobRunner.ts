import PriorityQueue from "./PriorityQueue";
import { IJob } from "./types";

interface QueueItem {
    job: IJob;
    priority: number;
}

export class JobRunner {
    queue: PriorityQueue<QueueItem>;

    constructor() {
        this.queue = new PriorityQueue({ comparator: (a: QueueItem, b: QueueItem) => (b.priority - a.priority) })
    }

    add(job: IJob, priority: number) {
        this.queue.queue({ job, priority });
    }

    runCurrentJob() {
        const jobItem = this.queue.dequeue();
        jobItem.job.run();
    }
 
    start(): NodeJS.Timer {
        console.log("Starting job runner...")
 
        // execute once before starting interval
        this.runCurrentJob();
        const cb = this.runCurrentJob;
 
        return setInterval(cb.bind(this), 100);
    } 
 }