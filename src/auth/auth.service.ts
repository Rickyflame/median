import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // step1: fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // if no user s found return an error
    if (user) {
      throw new NotFoundException('No user found for this email: ${email}');
    }

    // step 2: check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //if password is incorrect throw error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }
    // step 3: Generate a JWT containing the user's ID
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
