enum RentStatus {
  CREATED,
  WAITING_DROPOFF,
  WAITING_PICKUP,
  DELIVERED,
}

enum RentSize {
  XS,
  S,
  M,
  L,
  XL,
}

export interface Rent {
  id: String
  lockerId: string
  weight: number
  size: RentSize
  status: RentStatus
}
