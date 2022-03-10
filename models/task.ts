import { TaskName, TaskState } from "../helper/enums";

export class Task {
    private taskType: number;
    taskName: string;
    startTime: Date;
    taskStatus: string;
    goldRevenue: number = 0;
    supplyRevenue: number = 0;
    lastGoldCashedTime: Date;

    constructor(taskType: number) {
        this.taskType = taskType;
        this.taskName = ``;
        this.translateTaskType();
        this.startTime = new Date(Date.now());
        this.lastGoldCashedTime = new Date(Date.now());
        this.taskStatus = TaskState.InProgress;
    }

    setTask(taskType: number) {
        this.taskType = taskType;
        this.translateTaskType();
        this.startTime = new Date(Date.now());
        this.lastGoldCashedTime = new Date(Date.now());
        this.taskStatus = TaskState.InProgress;
    }

    translateTaskType(): void {
        switch (this.taskType) {
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
        if (this.taskType === 1) {
            const now = new Date(Date.now());
            const timePast = Math.floor((now.getTime() - this.lastGoldCashedTime.getTime()) / 1000);

            const currentRevenue = Math.floor(timePast / 10);
            if (currentRevenue >= 1) {
                this.lastGoldCashedTime = new Date(Date.now());
                return currentRevenue;
            }
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

    clone(task: Task) {
        this.taskType = task.taskType;
        this.translateTaskType();
        this.startTime = task.startTime;
        this.taskStatus = task.taskName;
        this.goldRevenue = task.goldRevenue;
        this.supplyRevenue = task.supplyRevenue;
        this.lastGoldCashedTime = task.lastGoldCashedTime;
    }

}

