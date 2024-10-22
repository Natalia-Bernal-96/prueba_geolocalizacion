import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("statistics_ip")
export class StatisticsIp {
    constructor() {
        this.id = 0;
        this.country_name = "";
        this.distance = 0;
        this.invocations = 0;
    }

    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country_name: string;

    @Column("float")
    distance: number;

    @Column()
    invocations: number;
}

