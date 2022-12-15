import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { configSchemaValidation } from './utils/config.schema';
import { UserRepository } from './auth/user.repository';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    AuthModule,
  WinstonModule.forRoot({}),
  ConfigModule.forRoot({
    envFilePath: [`.env.${process.env.STAGE}`],
    isGlobal: true,
    // validationSchema: configSchemaValidation,
  }),
  AuthModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Akinwunmipg',
    database: 'test',
    entities: [User],
    synchronize: true,
  })
  // TypeOrmModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory: async( configService: ConfigService) => {
  //     const isProduction = configService.get('STAGE') === 'prod';
  //       return {
  //         ssl: isProduction,
  //         extra: {
  //           ssl: isProduction ? { rejectUnauthorized: false } : null,
  //         },
  //         type: 'postgres',
  //         autoLoadEntities: true,
  //         synchronize: true,
  //         host: configService.get('DB_HOST'),
  //         port: configService.get('DB_PORT'),
  //         username: configService.get('DB_USERNAME'),
  //         password: configService.get('DB_PASSWORD'),
  //         database: configService.get('DB_DATABASE'),
  //       };
  //   }
  // }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
