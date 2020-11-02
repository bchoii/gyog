import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-lib',
  template: `
    <p>
      lib works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
