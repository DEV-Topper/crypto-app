import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../components/button/button.component';
import { RoutePath } from '../../../../interfaces/route-path';
import { VerificationService } from '../verification.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'cr-verification-step3',
  templateUrl: './step3.component.html',
  standalone: true,
  imports: [IonContent, IonIcon, ButtonComponent],
})
export class Step3Component {
  constructor(
    private router: Router,
    private verificationService: VerificationService,
  ) {}

  nextStep() {
    this.router.navigate(['/', RoutePath.WALLETCREATION]);
  }

  previousStep() {
    this.router.navigate(['/auth/verification/step2']);
  }

  async takePictures() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if (image.webPath) {
        // Handle the captured image
        console.log('Image captured:', image.webPath);
        // TODO: Upload image to server or process further
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async uploadPhotos() {
    try {
      const images = await Camera.pickImages({
        quality: 90,
        limit: 2, // Limit to 2 images for ID verification
        correctOrientation: true
      });

      if (images.photos.length > 0) {
        // Handle the selected images
        console.log('Images selected:', images);
        // TODO: Upload images to server or process further
      }
    } catch (error) {
      console.error('Error picking images:', error);
    }
  }
}
