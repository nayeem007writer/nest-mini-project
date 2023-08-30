import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  findMany(): any {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
