import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import {Cliente} from "./cliente.entity";

@Entity()
export class Carro {
    @PrimaryGeneratedColumn()
    carro_id: number;

    @Column("varchar", { length: 11 })
    placa: string;

    @Column("varchar", { length: 11 })
    renavam: string;

    @Column("varchar", { length: 55 })
    tipo: string;

    @Column("varchar", { length: 55 })
    status: string;

    @Column()
    cliente_id: number;

    @ManyToOne(() => Cliente, cliente => cliente.carros)
    cliente: Cliente;

}