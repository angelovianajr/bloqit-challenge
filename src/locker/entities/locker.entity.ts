import { Bloq } from '../../bloq/entities/bloq.entity';
import { Rent } from '../../rent/entities/rent.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LockerStatus } from '../locker.interface';

@Entity()
export class Locker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Bloq, (bloq) => bloq.lockers)
  @JoinColumn({ name: 'bloqId' })
  bloq: Bloq;

  @Column({
    type: "enum",
    enum: LockerStatus
  })
  status: LockerStatus;

  @Column({ default: false })
  isOccupied: boolean;

  @OneToMany(() => Rent, (rent) => rent.locker, { nullable: true })
  rents: Rent[]
}