import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

@Global() // Makes the module available everywhere without re-importing
@Module({
  providers: [
    {
      provide: 'UPSTASH_REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Redis({
          url: configService.get<string>('UPSTASH_REDIS_REST_URL'),
          token: configService.get<string>('UPSTASH_REDIS_REST_TOKEN'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['UPSTASH_REDIS_CLIENT'], // Export token so other modules can use it
})
export class RedisModule {}
