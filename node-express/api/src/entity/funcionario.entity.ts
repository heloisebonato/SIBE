import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Role} from "./role.entity";


@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    funcionario_id: number;

    @Column("varchar", { length: 255 })
    nome: string;

    @Column("char")
    funcao: string;

    @Column("varchar", { length: 55 })
    login: string;

    @Column("varchar", { length: 255 })
    senha: string;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;

}