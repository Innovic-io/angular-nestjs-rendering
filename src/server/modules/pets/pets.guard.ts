import { CanActivate, Guard, ExecutionContext } from '@nestjs/common';

@Guard()
export class PetsGuard implements CanActivate {
  canActivate(request: any, context: ExecutionContext): boolean {
    return true;
  }
}
