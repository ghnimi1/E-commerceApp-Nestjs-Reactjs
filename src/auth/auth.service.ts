import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/models/user.model';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  doesPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async register(user: Readonly<UserDto>) {
    const { fullName, email, country, age, password, isAdmin } = user;

    const existingUser = await this.UserModel.findOne({ email }).exec();

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);

    const newUser = new this.UserModel({
      fullName,
      email,
      password: hashedPassword,
      age,
      country,
      isAdmin,
    });
    await newUser.save();
    return {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      age: newUser.age,
      country: newUser.country,
      isAdmin: newUser.isAdmin,
    };
  }

  async login(data: AuthDto) {
    const { email, password } = data;
    const user = await this.UserModel.findOne({ email }).exec();
    const doesUserExist = !!user;

    if (!doesUserExist)
      throw new HttpException(
        'An account with that email not exists!',
        HttpStatus.CONFLICT,
      );

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch)
      throw new HttpException('Incorrect password!', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
