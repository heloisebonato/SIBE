import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import {Cliente} from "./cliente.entity";

@Entity()
export class Engate {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column("varchar", { length: 20 })
    nome: string;

    @Column("varchar", { length: 20 })
    marca: string;

    @Column("float")
    preco: number;

}