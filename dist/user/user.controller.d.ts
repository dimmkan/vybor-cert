import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { DeleteResult } from "typeorm";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserEntity[]>;
    updateUser(updateUserDto: UpdateUserDto, id: number): Promise<UserEntity>;
    deleteUser(id: number): Promise<DeleteResult>;
    authUser(loginUserDto: LoginUserDto): Promise<{
        'isAuth': boolean;
    }>;
}
