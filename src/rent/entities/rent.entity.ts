import { Locker } from '../../locker/entities/locker.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { RentSize } from '../rent.interface'

@Entity()
export class Rent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Locker, (locker) => locker.rents, { nullable: true })
  @JoinColumn({ name: 'lockerId' })
  locker: Locker;

  @Column({
    nullable: true
  })
  weight: number;

  @Column({
    type: "enum",
    enum: RentSize
  })
  size: RentSize;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true
  })
  droppedOffAt: Date;

  @Column({
    nullable: true
  })
  pickedUpAt: Date;
}