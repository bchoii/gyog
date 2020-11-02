import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'lib-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent implements OnInit {
  @Input()
  value = [];

  @Output()
  valueChange = new EventEmitter();

  @Input()
  options;

  constructor() {}

  ngOnInit(): void {}

  onChange(event): void {
    if (event.target.checked) {
      this.value = [...this.value, event.target.value];
    }
    if (!event.target.checked) {
      this.value = this.value.filter((v) => v !== event.target.value);
    }
    this.valueChange.emit(this.value);
  }
}
