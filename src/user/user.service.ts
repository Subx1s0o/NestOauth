import { PrismaService } from '@libs/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const { password, id, ...currentUser } = user;
    return {
      ...currentUser,
    };
  }
}
