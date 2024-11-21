import { Locker } from 'src/locker/entities/locker.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Bloq {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  address: string;

  @OneToMany(() => Locker, (lockers) => lockers.bloq)
  lockers: Locker[]
}