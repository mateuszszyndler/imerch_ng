import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-register-callback',
  templateUrl: './register-callback.component.html',
  styleUrls: ['./register-callback.component.scss']
})
export class RegisterCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { code, service } = params;
      this.authService.handleSocialLoginCallback(service, code).subscribe();
    });
  }
}
