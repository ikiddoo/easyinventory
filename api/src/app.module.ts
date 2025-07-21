import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { defineConfig } from '@mikro-orm/postgresql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return defineConfig({
          host: configService.get<string>('DB_HOST') || 'localhost',
          port: parseInt(configService.get<string>('DB_PORT') || '5433'),
          user: configService.get<string>('DB_USERNAME') || 'postgres',
          password: configService.get<string>('DB_PASSWORD') || '',
          dbName: configService.get<string>('DB_NAME') || 'easyinvetory',
          entities: [User, Product],
          debug: true,
          discovery: {
            warnWhenNoEntities: false,
          },
        });
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}