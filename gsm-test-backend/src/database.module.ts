import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConfig } from './database.config';

@Module({
  imports: [    
    TypeOrmModule.forRootAsync({
      useFactory: () => (defaultConfig),
    }),
  ],
})
export class DatabaseModule {}