import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  @Input() src: string;

  constructor(private platform: Platform,
              private modalController: ModalController) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.onDismiss();
    });
  }

  public onDismiss() {
    this.modalController.dismiss();
  }

}
