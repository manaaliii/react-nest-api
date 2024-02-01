import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("./entity/user.entity").User[]>;
    addUser(files: any, createUserDto: unknown): {
        message: string;
    };
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    getUserById(userId: number): Promise<import("./entity/user.entity").User>;
    deleteUserById(userId: number): Promise<import("typeorm").DeleteResult>;
}
