import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-change',
  templateUrl: './login-change.component.html',
  styleUrls: ['./login-change.component.scss']
})
export class LoginChangeComponent {
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  changePassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value as { currentPassword: string; newPassword: string };

    this.authService.changePassword(currentPassword, newPassword).subscribe(() => {
      // After successful password change, we can notify the user
      alert('Password changed successfully');
    }, error => {
      // If there's an error, we can handle it here
      console.error(error);
    });
  }
}
