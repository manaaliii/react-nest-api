import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("./entity/user.entity").User[]>;
    addUser(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entity/user.entity").User>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    getUserById(userId: number): Promise<import("./entity/user.entity").User>;
    deleteUserById(userId: number): Promise<import("typeorm").DeleteResult>;
}
