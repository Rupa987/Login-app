import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [FormsModule],
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: any;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  saveProfile() {
    console.log('Profile saved!');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  uploadProfilePic(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePic = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
