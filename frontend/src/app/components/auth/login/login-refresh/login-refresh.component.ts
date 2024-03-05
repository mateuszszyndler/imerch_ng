import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login-refresh',
  templateUrl: './login-refresh.component.html',
  styleUrls: ['./login-refresh.component.scss']
})
export class LoginRefreshComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.refreshToken().subscribe(() => {
      alert('Token refreshed successfully');
    }, error => {
      console.error(error);
    });
  }
}
