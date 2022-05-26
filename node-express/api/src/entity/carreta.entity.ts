import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Carreta {
    @PrimaryGeneratedColumn()
    carreta_id: number;

    @Column("varchar", { length: 7 })
    placa: string;

    @Column("varchar", { length: 55 })
    tipo: string;

    @Column("varchar", { length: 55 })
    status: string;

    // @Column("varchar", { length: 255 })
    // image: string;

    @Column("float")
    preco: number;

}