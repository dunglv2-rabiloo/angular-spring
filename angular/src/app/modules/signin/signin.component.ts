import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../shared/shared.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  router = inject(Router);
  authService = inject(AuthService);

  error = '';
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
      if (e instanceof HttpErrorResponse) {
        this.error = (e.error as ApiError).error;
      }
    } finally {
      this.submitting = false;
    }
  }
}
