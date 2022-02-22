import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'kkt_certificate'})
export class KktEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization: string;

    @Column()
    regNumber: string;

    @Column()
    zavNumber: string;

    @Column()
    kktModel: string;

    @Column({ type: 'date' })
    regDate: string;

    @Column({ type: 'date' })
    toDate: string;

    @Column()
    ofd: string;

    @Column()
    fnModel: string;

    @Column()
    zavNumberFN: string;

    @Column()
    comPortNumber: string;
}