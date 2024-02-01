import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";

@Module({
  controllers: [UserController],
  imports: [
      TypeOrmModule.forFeature([User]), MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB limit
      },
      storage: diskStorage({
          destination: (req, file, cb) => {
              let uploadPath = './uploads';

              if (file.mimetype.toLowerCase() === 'application/pdf') {
                  uploadPath = './uploads/resumes';
              } else if (file.mimetype.startsWith('image/')) {
                  uploadPath = './uploads/images';
              }

              cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
              cb(null, file.originalname);
          },
      }),
      })
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
