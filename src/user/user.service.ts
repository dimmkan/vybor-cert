import { Injectable } from '@nestjs/common';
import {UserEntity} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {LoginUserDto} from "./dto/loginUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>,
    ) {

    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async authUser(loginUserDto: LoginUserDto): Promise<boolean> {
        const user = await this.userRepository.findOne({name: loginUserDto.login, password: loginUserDto.password});
        return user ? true : false;
    }
}
