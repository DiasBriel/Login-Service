import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column("text")
  name: string

  @Column("text")
  email: string

  @Column("text")
  password: string

  @CreateDateColumn({ name: 'createdAt' }) 
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt' }) 
  updatedAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
};
