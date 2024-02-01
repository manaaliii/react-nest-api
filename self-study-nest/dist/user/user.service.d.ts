import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<User[]>;
    getOne(id: number): Promise<User>;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    delete(userId: number): Promise<import("typeorm").DeleteResult>;
    getByEmail(email: string): Promise<User[]>;
}
