import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ email, password }: SignupParams) {
    const userExits = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    console.log({ userExits });

    if (userExits) {
      throw new ConflictException();
    }
  }
}
