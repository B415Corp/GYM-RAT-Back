import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://alexeykoh:q08kU5z5M00rj5A7@gym-rat-next-cluster-1.ylegj.mongodb.net/gym-rat-next',
    ),
    UserModule,
    WorkoutsModule,
    AuthModule,
  ],
  // providers: [WorkoutsService],
  // controllers: [WorkoutsController],
})
export class AppModule {}
