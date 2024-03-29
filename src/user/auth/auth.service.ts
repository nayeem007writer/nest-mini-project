import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}
interface SigninParams {
  email: string;
  password: string;
}
// interface ProductKeyParams {
//   email: string;
//   userType: UserType;
// }

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(
    { email, password, name, phone }: SignupParams,
    userType: UserType,
  ) {
    const userExits = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    console.log({ userExits });

    if (userExits) {
      throw new ConflictException();
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        user_type: userType,
      },
    });
    console.log(user);
    return this.generateJWT(name, user.id);
  }
  async signIn({ email, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }
    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compareSync(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentilas', 400);
    }
    return this.generateJWT(user.name, user.id);
  }

  private generateJWT(name: string, id: string) {
    return jwt.sign(
      {
        name,
        id,
      },
      process.env.JSON_WEB_TOKEN_KEY,
      {
        expiresIn: 360000,
      },
    );
  }

  generateProductKey(email: string, userType: UserType) {
    const sdtring = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hashSync(sdtring, 10);
  }
}
