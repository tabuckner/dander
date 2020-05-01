import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit {
  @Input() public embedString: string;
  public sanitizedEmbedString: SafeHtml;

  constructor(private sanitizer: DomSanitizer,
              private platform: Platform,
              private modalController: ModalController) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.onDismiss();
    });
    this.sanitizedEmbedString = this.sanitizer.bypassSecurityTrustHtml(this.embedString);
  }

  public onDismiss() {
    this.modalController.dismiss();
  }

}
