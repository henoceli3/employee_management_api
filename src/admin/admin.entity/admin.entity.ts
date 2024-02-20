import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'admin' })
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  isActive: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
