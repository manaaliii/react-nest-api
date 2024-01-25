import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Matches, IsNumber } from "class-validator";

export class UpdateUserDto{
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Name should contain only alphabets' })
    @ApiProperty({type: 'string'})
    name:string;

    @IsEmail()
    @ApiProperty({type: 'string'})
    email:string;

    @IsNumber()
    @ApiProperty({type: 'number'})
    age:number;

    @IsString()
    @ApiProperty({type: 'string'})
    password:string;

    // @IsString()
    // @Matches(/^[a-zA-Z]+$/, { message: 'Designation should contain only alphabets' })
    // designation:string;
}