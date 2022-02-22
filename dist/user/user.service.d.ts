import { UserEntity } from "./user.entity";
import { DeleteResult, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getAllUsers(): Promise<UserEntity[]>;
    updateUser(updateUserDto: UpdateUserDto, id: number): Promise<UserEntity>;
    deleteUser(id: number): Promise<DeleteResult>;
    authUser(loginUserDto: LoginUserDto): Promise<boolean>;
}
