import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LockerModule } from './locker/locker.module';
import { BloqModule } from './bloq/bloq.module';
import { RentModule } from './rent/rent.module';
import { Bloq } from './bloq/entities/bloq.entity';
import { Locker } from './locker/entities/locker.entity';
import { Rent } from './rent/entities/rent.entity';
import { ConfigModule } from '@nestjs/config';
import { RentSubscriber } from './rent/entities/rent.subscriber';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), 
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging:true,
    entities: [Bloq, Locker, Rent],
    synchronize: true,
    subscribers: [RentSubscriber]
  }), LockerModule, BloqModule, RentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
