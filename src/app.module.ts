import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LockerModule } from './locker/locker.module';
import { BloqModule } from './bloq/bloq.module';
import { RentModule } from './rent/rent.module';
import { Bloq } from './bloq/entities/bloq.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-2c6c3afd-angelovianajr-317e.g.aivencloud.com',
    port: 14200,
    username: 'avnadmin',
    password: 'AVNS_3pcGnYDy2ccyrdbZEge',
    database: 'defaultdb',
    entities: [Bloq],
    synchronize: true,
  }), LockerModule, BloqModule, RentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
