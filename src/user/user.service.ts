import { PrismaService } from '@libs/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ForbiddenException(
        'Cant make request about user, check if user is logged',
      );
    }

    const { password, id, ...currentUser } = user;

    return {
      ...currentUser,
    };
  }
}
