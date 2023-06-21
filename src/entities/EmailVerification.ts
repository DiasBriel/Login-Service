import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('email_verifications')
export default class EmailVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column("text")
  email: string

  @Column("text")
  token: string

  @Column("timestamp")
  expiresAt: Date

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
