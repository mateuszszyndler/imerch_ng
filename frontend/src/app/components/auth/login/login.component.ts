import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('1100ms ease'),
      ]),
      transition(
        ':leave',
        animate(
          '1100ms ease',
          style({ opacity: 0, transform: 'translateY(100%)' })
        )
      ),
    ]),
  ],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value as {
      username: string;
      password: string;
    };

    this.authService.loginUser(username, password).subscribe({
      next: (user) => {
        this.router.navigate(['/home']);
        console.log('Login successful');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  socialLogin(service: string) {
    this.authService.socialLogin(service);
  }
}
