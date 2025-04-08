export enum Importance {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

export enum Urgency {
  LOW = "Low",
  NORMAL = "Normal",
  URGENT = "Urgent"
}

export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  importance: Importance;
  urgency: Urgency;
  status: Status;
  estimatedTime: number; // in minutes
  blockedBy: string[]; // Array of Todo IDs that block this task
  blocks: string[]; // Array of Todo IDs that this task blocks
  createdAt: Date;
  completedAt?: Date;
}
