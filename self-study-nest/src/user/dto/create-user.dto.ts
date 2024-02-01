import {IsString, IsEmail, Matches, IsNumber, IsObject} from "class-validator";

export class CreateUserDto {
    @IsString()
    @Matches(/^[a-zA-Z]+$/, {message: 'Name should contain only alphabets'})
    name: string;

    @IsEmail()
    email: string;

    // @IsNumber()
    // @IsString()
    // age: number;

    @IsString()
    password: string;


    @IsObject()
    profile: object;


    @IsObject()
    resume: object;

    // @IsString()
    // @Matches(/^[a-zA-Z]+$/, { message: 'Designation should contain only alphabets' })
    // designation:string;
}