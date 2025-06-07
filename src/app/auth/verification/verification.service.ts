import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface VerificationState {
  nationality: string;
  verifyWith: string;
  bvnNumber: string;
  documentCountry: string;
  documentType: string;
}

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private state = new BehaviorSubject<VerificationState>({
    nationality: 'Nigeria',
    verifyWith: 'BVN',
    bvnNumber: '',
    documentCountry: 'Nigeria',
    documentType: 'ID Card',
  });

  state$ = this.state.asObservable();

  updateState(partialState: Partial<VerificationState>) {
    this.state.next({
      ...this.state.value,
      ...partialState,
    });
  }

  getState(): VerificationState {
    return this.state.value;
  }

  resetState() {
    this.state.next({
      nationality: 'Nigeria',
      verifyWith: 'BVN',
      bvnNumber: '',
      documentCountry: 'Nigeria',
      documentType: 'ID Card',
    });
  }
}
