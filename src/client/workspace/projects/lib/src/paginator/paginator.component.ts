import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'lib-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() currentpage;
  @Input() pageCount;

  @Output() currentpageChange = new EventEmitter();

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  _gotopage(page) {
    if (page < 0) {
      return;
    }
    if (page >= this.pageCount) {
      return;
    }

    this.currentpage = page;
    this.currentpageChange.emit(page);
    this.cdr.markForCheck();
  }
}
