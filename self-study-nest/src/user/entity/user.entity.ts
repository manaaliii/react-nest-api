import {PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column()
    resume: string;

    @Column()
    profile: string;
}