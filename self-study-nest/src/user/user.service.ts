import {Injectable} from '@nestjs/common';
import {User} from "./entity/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    async getAll() :Promise<User[]> {
        return this.userRepository.find();
    }

    async getOne(id: number) :Promise<User> {
        return this.userRepository.findOne({where: {id}});
    }

    async create(createUserDto: CreateUserDto){
        return this.userRepository.save(createUserDto);
    }

    async update(userId: number, updateUserDto:UpdateUserDto){
        return this.userRepository.update(userId, updateUserDto)
    }

    async delete(userId: number) {
        return this.userRepository.delete(userId);
    }

    async getByEmail(email: string){
        return this.userRepository.find({where: {email}})
    }
}
