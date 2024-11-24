import { EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { Rent } from "./rent.entity";
import { RentStatus } from "../rent.interface";

@EventSubscriber()
export class RentSubscriber implements EntitySubscriberInterface<Rent> {
  listenTo() {
    return Rent;
  }

  async afterLoad(rent: Rent): Promise<void> {
    let status;

    // Rent was created, but there is no locker, dropoff or pickup date
    if(rent.createdAt && !rent.locker && !rent.droppedOffAt && !rent.pickedUpAt) {
      status = RentStatus.CREATED
    // Rent was created and have a locker linked
    } else if (rent.createdAt && rent.locker&& !rent.droppedOffAt && !rent.pickedUpAt) {
      status = RentStatus.WAITING_DROPOFF
    // Rent was created, has a locker and a dropoff date
    } else if (rent.createdAt && rent.locker && rent.droppedOffAt  && !rent.pickedUpAt ) {
      status = RentStatus.WAITING_PICKUP
    // Rent was created, has a locker, a dropoff date and a pickup date
    } else {
      status = RentStatus.DELIVERED
    }

    rent.status = status
  }
}