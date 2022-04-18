import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    administrador_id: number;

    @Column("varchar", { length: 255 })
    nome: string;

    @Column("char")
    funcao: string;

    @Column("varchar", { length: 55 })
    login: string;

    @Column("varchar", { length: 12 })
    senha: string;

}