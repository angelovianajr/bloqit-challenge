import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Locker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bloqId: string;

  @Column()
  status: string;

  @Column({ default: false })
  isOccupied: boolean;
}