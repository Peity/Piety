import { MemberSchema } from "./members";
import { TaskName, TaskState } from "../helper/enums";

export class Task{
    private taskType: number;
    taskName: string;
    startTime: Date;
    taskStatus: string;
    goldRevenue: number = 0;
    supplyRevenue: number = 0;

    constructor(taskType: number) {
        this.taskType = taskType;
        this.taskName = ``;
        this.translateTaskTyoe();
        this.startTime = new Date(Date.now());
        this.taskStatus = TaskState.InProgress;
    }

    setTask(taskType: number) {
        this.taskType = taskType;
        this.translateTaskTyoe();
        this.startTime = new Date(Date.now());
        this.taskStatus = TaskState.InProgress;
    }

    translateTaskTyoe(): void{
        switch(this.taskType) {
            case 0: {
                this.taskName = TaskName.Idle;
                break;
            }

            case 1: {
                this.taskName = TaskName.Farming;
                break;
            }

            case 2: {
                this.taskName = TaskName.Defending;
                break;
            }

            case 3: {
                this.taskName = TaskName.InExpedition;
                break;
            }

            case 4: {
                this.taskName = TaskName.Invading;
                break;
            }

            default: {
                this.taskName = TaskName.Idle;
                break;
            }
        }
    }

    private calculateFarmingRevenue(): number {
        if (this.taskName === TaskName.Farming) {
            const now = new Date(Date.now());
            const timePast = Math.abs((now.getTime() - this.startTime.getTime()) / 1000);

            const currentRevenue = timePast / 10;

            return currentRevenue;
        }

        return 0;
    }

    getGoldRevenue(): number {
        this.goldRevenue += this.calculateFarmingRevenue();
        return this.goldRevenue;
    }

    cashRevenue(): number {
        const cashed = this.goldRevenue;
        this.goldRevenue = 0;

        return cashed;
    }

}

