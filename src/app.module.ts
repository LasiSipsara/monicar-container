import { Module } from '@nestjs/common';
import { DependencyType } from './monicar/interfaces/enum';
import { HealthObserverModule } from './monicar/monicar.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthObserverModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
        dependencies: JSON.parse(
          configService.get<string>('DEPENDANCIES') || '[]'
        )
      })
    }),

  ],
})
export class AppModule { }
