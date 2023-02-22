import { Controller, Get, Param, Patch, UseGuards, Body } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { UserDto } from 'src/dto/user.dto';
import { GetCurrentUser } from 'src/utils/getCurrentUser.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.service.getAllUsers();
  }
  @UseGuards(JwtGuard)
  @Get('me')
  GetCueent(@GetCurrentUser() user: any) {
    return this.service.GetCurrent(user);
  }
  @UseGuards(JwtGuard)
  @Patch('update')
  updateProfile(
    @Body() updateProfile: UpdateUserDto,
    @GetCurrentUser() user: any,
  ) {
    return this.service.updateProfile(updateProfile, user);
  }
  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
