import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { Carreta } from "./carreta.entity";
import { Carro } from "./carro.entity";

@Entity()
export class Locacao {
    @PrimaryGeneratedColumn()
    locacao_id: number;

    @Column("varchar", { length: 11 })
    data_entrada: string;

    @Column("varchar", { length: 11 })
    data_prevista_entrada: string;

    @Column("varchar", { length: 11 })
    data_saida: string;

    @Column("varchar", { length: 11 })
    data_prevista_saida: string;

    @Column("float")
    preco_total: number;

    @Column("varchar", { length: 55 })
    status: string;

    // @Column()
    // carro_id: number;



    @ManyToMany(() => Carro)
    @JoinTable({
        name: 'carro_locacao',
        joinColumn: {name: 'locacao_id', referencedColumnName: 'locacao_id'},
        inverseJoinColumn: {name: 'carro_id', referencedColumnName: 'carro_id'}
    })
    carro: Carro[];

    @ManyToMany(() => Carreta)
    @JoinTable({
        name: 'carreta_locacao',
        joinColumn: {name: 'locacao_id', referencedColumnName: 'locacao_id'},
        inverseJoinColumn: {name: 'carreta_id', referencedColumnName: 'carreta_id'}
    })
    carreta: Carreta[];




}