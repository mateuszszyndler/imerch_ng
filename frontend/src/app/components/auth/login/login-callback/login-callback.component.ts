import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const service = this.route.snapshot.paramMap.get('service');
    const code = this.route.snapshot.queryParamMap.get('code');

    if (!service || !code) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.handleSocialLoginCallback(service, code).subscribe(user => {
      // After successful login, we redirect to home page
      this.router.navigate(['/home']);
    }, error => {
      // If there's an error, we can handle it here
      console.error(error);
    });
  }
}
