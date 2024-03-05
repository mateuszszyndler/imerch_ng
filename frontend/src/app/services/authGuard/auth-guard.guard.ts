import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.currentUser.pipe(
      map((user) => {
        if (user && user.role) {
          // User is logged in and role is defined
          if (next.data && 'roles' in next.data) {
            const roles = next.data['roles'] as Array<string>;
            if (roles) {
              // There are some roles in this route
              const match = roles.some(
                (role) => user.role && user.role.includes(role)
              );
              if (match) {
                return true;
              } else {
                // This user has no access to this route
                // You may want to send them to an error page, or to the homepage
                this.router.navigate(['/']);
                return false;
              }
            } else {
              // No roles are required for this route, so just return true
              return true;
            }
          } else {
            // No roles are required for this route, so just return true
            return true;
          }
        } else {
          // User is not logged in, so redirect them to the login page
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }
}
