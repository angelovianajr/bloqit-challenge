import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lockerId: string;

  @Column()
  weight: number;

  @Column()
  size: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  droppedOffAt: Date;

  @Column()
  pickedUpAt: Date;
}