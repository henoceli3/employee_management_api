import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'employee' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  isActive: boolean;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  nom: string;

  @Column({ nullable: false })
  prenom: string;

  @Column({ nullable: false })
  civilite: string;

  @Column({ nullable: false })
  numero_de_telephone: string;

  @Column({ nullable: false })
  type_contrat: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
