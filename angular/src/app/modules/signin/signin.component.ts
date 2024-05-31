import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  router = inject(Router);
  authService = inject(AuthService);

  submitting = false;
  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async handleSignin() {
    if (this.formGroup.invalid) {
      return;
    }

    try {
      this.submitting = true;
      await this.authService.signIn(
        this.formGroup.value.username || '',
        this.formGroup.value.password || ''
      );
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.submitting = false;
    }
  }
}
