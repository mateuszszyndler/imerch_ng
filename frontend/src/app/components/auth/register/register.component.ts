import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { firstname, lastname, email, password } = this.registerForm.value;

    const newUser: User = {
      _id: '', // Leave it empty for now since the server will generate it
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
      password: password || '',
    };

    this.authService.registerUser(newUser).subscribe({
      next: () => {
        console.log('Registration successful');
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });

  }
}
