import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { CardModel } from 'src/app/core/interfaces/card-model';
import { CardChoices } from 'src/app/core/enums/card-choices.enum';
import { DogImageService } from 'src/app/core/services/dog-image.service';
import { PetFinderService } from 'src/app/core/api/pet-finder.service';
import { ExternalLinkService } from 'src/app/core/services/external-link.service';
import { ModalController, Platform } from '@ionic/angular';
import { CardDetailsComponent } from '../card-details/card-details.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() public card: CardModel;
  @Output() public selectionMade = new EventEmitter<CardChoices>();
  public imageUrl: string;
  moveOutWidth: number;
  transitionInProgress: boolean;
  isMoving = false;
  isExpanded = false;
  isMobile = false;

  constructor(private renderer: Renderer2,
              private elRef: ElementRef,
              private image: PetFinderService,
              private externalLink: ExternalLinkService,
              private modalController: ModalController,
              private platform: Platform) { }

  public ngOnInit() {
    this.isMobile = !this.platform.is('tablet') || !this.platform.is('desktop');
  }

  public ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
  }

  public handlePan(event) {

    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0)) {
      return;
    }

    // if (this.transitionInProgress) {
    //   this.handleShift();
    // }

    // this.renderer.addClass(this.targetEl, 'moving');
    this.isMoving = true;

    // if (event.deltaX > 0) { this.toggleChoiceIndicator(false, true) }
    // if (event.deltaX < 0) { this.toggleChoiceIndicator(true, false) }

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.targetEl,
      'transform',
      'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)'
    );
  }

  public handlePanEnd(event) {

    // this.toggleChoiceIndicator(false,false);

    // this.renderer.removeClass(this.targetEl, 'moving');
    this.isMoving = false;

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.targetEl, 'transform', '');
      // this.shiftRequired = false;

    } else {

      const endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.targetEl,
        'transform',
        'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)'
        );

      // this.shiftRequired = true;

      const heart = !!(event.deltaX > 0);
      heart ? this.onLike() : this.onDislike();
    }
    this.transitionInProgress = true;
  }

  public onInfo() {
    this.externalLink.openLink(this.card.externalUrl);
  }

  public async onDescription() {
    const modal = await this.modalController.create({
      component: CardDetailsComponent,
      swipeToClose: true,
      componentProps: {
        card: { ...this.card }
      },
      cssClass: this.isMobile ? 'modal--is-mobile' : ''
    });
    return await modal.present();
  }

  public onLike() {
    this.animateCard(CardChoices.like);
    this.selectionMade.emit(CardChoices.like);
  }

  public onDislike() {
    this.animateCard(CardChoices.dislike);
    this.selectionMade.emit(CardChoices.dislike);
  }

  private animateCard(choice: CardChoices) {
    if (choice === CardChoices.like) {
      this.renderer.setStyle(
        this.targetEl,
        'transform',
        'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)'
      );
      // this.toggleChoiceIndicator(false, true);
      // this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(
        this.targetEl,
        'transform',
        'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)');
      // th
      // is.toggleChoiceIndicator(true, false);
      // this.emitChoice(heart, this.cards[0]);
    }
  }


  private get targetEl(): any {
    return this.elRef.nativeElement.querySelector('ion-card');
  }
}
