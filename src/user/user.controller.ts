import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      return this.userService.findOrCreateUser(dto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error("Unexpected error occurred");
    }
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error("Unexpected error occurred");
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error("Unexpected error occurred");
    }
  }
}
