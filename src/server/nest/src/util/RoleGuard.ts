import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

const matchRoles = (roles, userroles) => {
  for (const role of roles) {
    if (userroles.includes(role)) {
      return true;
    }
  }
  console.log('RoleGuard blocked.');
  return false;
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roles: string[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      console.log('User not set. RoleGuard requires SessionGuard.');
      return false;
    }
    return matchRoles(this.roles, request.user.roles);
  }
}
