import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
  categories;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.categories = ((await this.http
      .get('/api/crud/category/')
      .toPromise()) as any).data;
    console.log(this.categories);
    this.cdr.markForCheck();
  }
}
