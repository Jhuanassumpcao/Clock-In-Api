export interface CreateTimeEntryDTO {
    userId: number;
    startTime: Date;
  }
  
  export interface UpdateTimeEntryDTO {
    userId: number;
    endTime: Date;
  }
  