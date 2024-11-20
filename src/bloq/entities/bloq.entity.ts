import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bloq {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  address: string;
}