import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {DeleteResult, UpdateResult} from "typeorm";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {LoginUserDto} from "./dto/loginUser.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }

    @Put('update/:id')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number): Promise<UserEntity> {
        return await this.userService.updateUser(updateUserDto, id);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<DeleteResult>{
        return await this.userService.deleteUser(id);
    }

    @Post('auth')
    async authUser(@Body() loginUserDto: LoginUserDto): Promise<{'isAuth':boolean}>{
        const result = await this.userService.authUser(loginUserDto);
        return {'isAuth': result};
    }
}
