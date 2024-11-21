export enum LockerStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export interface Locker {
  id: string
  bloqId: string
  status: LockerStatus
  isOccupied: boolean
}