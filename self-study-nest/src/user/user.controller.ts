import {Controller, Delete, Get, Post, Put, Param, ParseIntPipe, Body} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import { ApiBody, ApiParam, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('User Test')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get('/')
    @ApiOperation({summary: 'Get all the ussers'})
    @ApiResponse({
        status: 200,    
        description: 'All data list'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden'
    })
    getUsers(){
        return this.userService.getAll();
    }

    
    @Post()
    @ApiOperation({summary: 'create new record'})
    @ApiBody({
        schema:{
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'John',
                    description: 'this is name'
                },
                email:{
                    type: 'string',
                    example: 'john@mail.com',
                    description: 'this is email'
                },
                age: {
                    type: 'integer',
                    example: 20,
                    description: 'this is age'
                },
                password: {
                    type: 'string',
                    example: '1234',
                    description: 'this is password'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'saved',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden'
    })
    addUser(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Put('/:userId')
    @ApiOperation({summary: 'update record'})
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'this is unique id',
        required: true
    })
    @ApiBody({type: UpdateUserDto})
    @ApiResponse({
        status: 200,
        description: 'updated',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden'
    })
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto){
        console.log(updateUserDto)
        return this.userService.update(userId, updateUserDto)
    }

    @Post('/:userId')
    @ApiOperation({summary: 'view record'})
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'this is unique id',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Deleted'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidder'
    })
    getUserById(@Param('userId', ParseIntPipe) userId:number){
        return this.userService.getOne(userId);
    }

    @Delete('/:userId')
    @ApiOperation({summary: 'delete record'})
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'this is unique id',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Deleted'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidder'
    })
    deleteUserById(@Param('userId', ParseIntPipe) userId:number){
        return this.userService.delete(userId)
    }
}
