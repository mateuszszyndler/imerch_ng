import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.scss']
})
export class LoginResetComponent implements OnInit {
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private authService: AuthService) {}
ngOnInit(): void {
console.log('reset initialized');
}

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }

    const { email } = this.resetForm.value as { email: string };

    this.authService.resetPassword(email).subscribe({
      next: () => {
        alert('If the email address you entered is associated with an account, you will receive an email with instructions to reset your password.');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
