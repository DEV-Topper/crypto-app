import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'cr-send-to-rizo-view',
  templateUrl: './send-to-rizo-view.component.html',
  styleUrls: ['./send-to-rizo-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ButtonComponent],
})
export class SendToRizoViewComponent implements OnInit {
  selectedTab: 'email' | 'rizo' = 'email';
  recipientInput: string = '';
  recentContacts: any[] = []; // TODO: Define a proper interface for recent contacts

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize data (e.g., fetch from a service)
    // This is placeholder data
    this.recentContacts = [
      { name: 'Alice Smith', id: 'alice.smith@example.com', idType: 'Email' },
      { name: 'Bob Johnson', id: '1234567890', idType: 'Phone' },
      { name: 'Charlie Brown', id: 'rizo123', idType: 'Rizo ID' },
      // Add more recent contacts as needed
    ];
  }

  goBack() {
    this.router.navigate(['/dashboard/account-balance']);
  }

  selectTab(tab: 'email' | 'rizo') {
    this.selectedTab = tab;
    this.recipientInput = '';
  }

  onContinue() {
    if (this.recipientInput.trim()) {
      console.log('Continue clicked with input:', this.recipientInput);
      // Implement continue logic, e.g., navigate to next step with recipientInput
    }
  }

  onEditRecent() {
    // Implement edit recent contacts logic
    console.log('Edit Recent clicked');
  }

  selectRecentContact(contact: any) {
    this.recipientInput = contact.id;
  }
}
