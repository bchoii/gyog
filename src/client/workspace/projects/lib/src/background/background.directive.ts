import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { uuid } from '../../../../../../../../main/src/utils';

@Directive({
  selector: '[background]',
})
export class BackgroundDirective {
  @Input() appBackground: string;

  @HostBinding('style.background') background;

  constructor(
    private element: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer2: Renderer2
  ) {
    this.background = this.sanitizer.bypassSecurityTrustStyle(
      `linear-gradient(-20deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 0.8) 100%), url(${
        this.appBackground || `/api/image/${uuid()}`
      }) center center/cover no-repeat scroll`
    );
  }
}
