import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carro } from "./carro.entity";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    cliente_id: number;

    @Column("varchar", { length: 255 })
    nome: string;

    @Column("varchar", { length: 11 })
    data_nascimento: string;

    @Column("varchar", { length: 15 })
    cnh: string;

    @Column("varchar", { length: 15 })
    cpf: string;

    @Column("varchar", { length: 15 })
    rg: string;
    
    @Column("varchar", { length: 10 })
    cep: string;

    @Column("varchar", { length: 255 })
    endereco: string;

    @Column("varchar", { length: 10 })
    n_casa: string;

    @Column("varchar", { length: 255 })
    cidade: string;

    @Column("varchar", { length: 2 })
    estado: string;

    @Column("varchar", { length: 255 })
    nome_mae: string;

    @Column("varchar", { length: 11 })
    renavam: string;

    @Column("varchar", { length: 7 })
    placa: string;

    @Column("varchar", { length: 10 })
    telefone: string;

    @Column("varchar", { length: 10 })
    celular: string;

    @Column("varchar", { length: 11 })
    data_cadastro: string;

    @OneToMany(() => Carro, carro => carro.cliente)
    carros: Carro[];

}