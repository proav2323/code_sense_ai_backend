import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Redis } from '@upstash/redis/fastly';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(@Inject('UPSTASH_REDIS_CLIENT') private readonly redis: Redis) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}
