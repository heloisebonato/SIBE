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

    // @ManyToOne(type => Cliente) @JoinColumn() 
    // cliente: Cliente;

    // @ManyToOne(() => Cliente)
    // @JoinTable({
    //     name: 'cliente_carro',
    //     joinColumn: {name: 'carro_id', referencedColumnName: 'cliente_id'},
        
    // }) clientes: Cliente[];

    // @ManyToMany(() => Cliente)
    // @JoinTable({
    //     name: 'carro_cliente',
    //     joinColumn: {name: 'carro_id', referencedColumnName: 'carro_id'},
    //     inverseJoinColumn: {name: 'cliente_id', referencedColumnName: 'cliente_id'}
    // })
    // clientes: Cliente[];


    @ManyToOne(() => Cliente, cliente => cliente.carros)
    cliente: Cliente;

}