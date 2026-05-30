export type ProcessStatus =
  | {
      status: "idle";
    }
  | {
      status: "processing";
      progress: number;
    }
  | {
      status: "completed";
      path: string;
    };
