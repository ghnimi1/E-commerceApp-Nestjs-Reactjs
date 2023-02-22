import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { User, UserDocument } from 'src/models/user.model';
import { GetCurrentUser } from 'src/utils/getCurrentUser.decorator';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getAllUsers() {
    return await this.UserModel.find({}).select('-password');
  }
  async GetCurrent(@GetCurrentUser() user: any) {
    return await this.UserModel.findById({ _id: user?._id.toString() }).select(
      '-password',
    );
  }
  async updateProfile(updateProfile: UpdateUserDto, user: any) {
    const { fullName, country, age } = updateProfile;
    const ProfileField = {
      fullName: fullName || user?.fullName,
      country,
      age,
    };
    try {
      const profile = await this.UserModel.findByIdAndUpdate(
        { _id: user._id },
        { $set: ProfileField },
        { new: true },
      ).select('-password');
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string) {
    return await this.UserModel.findById(id).select('-password');
  }
}
