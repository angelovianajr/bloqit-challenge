enum LockerStatus {
  OPEN,
  CLOSED,
}

export interface Locker {
  id: String
  bloqId: String
  status: LockerStatus
  isOccupied: boolean
}