import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ButtonComponent
  ]
})
export class SettingsComponent {
  currentView: string = 'settings';
  showLogoutPopup: boolean = false;

  constructor(private router: Router) {}

  goBack() {
    if (this.currentView === 'security' || this.currentView === 'profile-details') {
      this.currentView = 'settings';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  goToSecurity() {
    this.currentView = 'security';
  }

  goToManageAccount() {
    this.currentView = 'profile-details';
  }

  // Logout popup methods
  openLogoutPopup() {
    this.showLogoutPopup = true;
  }

  closeLogoutPopup() {
    this.showLogoutPopup = false;
  }

  confirmLogout() {
    // Add your logout logic here
    console.log('User logged out');
    this.showLogoutPopup = false;
    // Navigate to login or home page
    this.router.navigate(['/login']);
  }
}