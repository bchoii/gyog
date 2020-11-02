import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  self$;

  constructor(public service: AppService) {
    this.self$ = service.self$;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const self = await (async () => {
      try {
        return await this.self$.toPromise();
      } catch (error) {}
    })();
    if (!self) {
      alert('User is not logged in. Please create an account / login first.');
      return false;
    }
    return true;
  }
}
