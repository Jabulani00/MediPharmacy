import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-documents-modal',
  templateUrl: './user-documents-modal.component.html',
  styleUrls: ['./user-documents-modal.component.scss'],
})
export class UserDocumentsModalComponent {
  @Input() user: any;

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  openDocument(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}