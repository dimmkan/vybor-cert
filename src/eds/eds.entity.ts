import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Type } from 'class-transformer';

@Entity({name: 'eds_certificate'})
export class EdsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization: string;

    @Column({nullable: true})
    position: string;

    @Column()
    fullname: string;

    @Column()
    inn: string;

    @Column({default: ''})
    certificateSerial: string;

    @Column({default: ''})
    vendor: string;

    @Column({default: ''})
    usageType: string;

    @Column({ type: 'date' })
    fromDate: string;

    @Column({ type: 'date' })
    toDate: string;

    @Column({default: ''})
    comment: string;

    @Column({nullable: true, select: false})
    fileData: string;

    @Column({nullable: true})
    fileName: string;

    @Column({nullable: true, select: false})
    fileType: string;

    @Column({nullable: true, select: false})
    fileSize: number;

    @Column({nullable: true})
    accountId: number;
}