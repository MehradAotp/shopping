import { Module } from '@nestjs/common';

import { ShoppingService } from './shopping/shopping.service';
import { ShoppingModule } from './shopping/shopping.module';
import { ShoppingController } from './shopping/shopping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Shopping, ShoppingSchema } from './shopping/database/model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shopping.name, schema: ShoppingSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URL') ||
          `mongodb://${configService.get('MONGODB_HOST')}:${configService.get('MONGODB_PORT')}`,
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASSWORD'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
        authSource: configService.get<string>('MONGODB_AUTHSOURCE') || 'admin',
        directConnection: true,
      }),
    }),
    ShoppingModule,
    UsersModule,
    AuthModule,
    CartModule,
  ],
  controllers: [ShoppingController],
  providers: [ShoppingService],
})
export class AppModule {}
