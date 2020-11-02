import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'lib-togglebutton',
  templateUrl: './togglebutton.component.html',
  styleUrls: ['./togglebutton.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglebuttonComponent implements OnInit {
  @Input()
  selected = false;

  @Output()
  selectedChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
