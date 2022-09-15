import { JobRunner } from "./JobRunner";

describe('JobRubber', () => {
    it('should work properly', async () => {
        const jobRunner = new JobRunner();
        console.log = jest.fn();

        jobRunner.add({ name: 'log test1', run: () => console.log('test1') }, 1);
        jobRunner.add({ name: 'log test0', run: () => console.log('test0') }, 0);
        jobRunner.add({ name: 'log test2', run: () => console.log('test2') }, 2);

        const timer = jobRunner.start();

        await new Promise(resolve => setTimeout(resolve, 3000));

        setTimeout(() => clearInterval(timer), 3000);

        expect(console.log).toBeCalledTimes(4);

        expect(console.log).toHaveBeenCalledWith('Starting job runner...');
        expect(console.log).toHaveBeenCalledWith('test0');
        expect(console.log).toHaveBeenCalledWith('test1');
        expect(console.log).toHaveBeenCalledWith('test2');
    });
});