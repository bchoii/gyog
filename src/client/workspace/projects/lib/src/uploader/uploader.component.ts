import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'lib-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent implements OnInit {
  target = '';
  status = 'Take Photo';

  @Input()
  url: string;

  @Output()
  urlChange = new EventEmitter();

  @ViewChild('fileinput') fileinput;

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  activate() {
    this.fileinput.nativeElement.click();
  }

  upload(event) {
    this.status = `Uploading... Please wait... `;
    const inputEl = event.target;
    const files: FileList = inputEl.files;
    if (files.length > 0) {
      const fd = new FormData();
      if (files instanceof FileList) {
        // tslint:disable-next-line
        for (let i = 0; i < files.length; i++) {
          fd.append('files', files[i]);
        }
      }
      if (files instanceof Blob) {
        fd.append('files', files);
      }

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (_event) => {
        console.log('onprogress', _event);
        if (_event.lengthComputable) {
          const p = (_event.loaded / _event.total) * 100;
          this.status = `Uploading ${p.toFixed(2)} %`;
          this.cdr.markForCheck();
        }
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 201) {
          this.status = `Upload complete`;
          console.log('response = ', xhr.response);
          const uploadResults = JSON.parse(xhr.response);
          this.url = `${this.target}${uploadResults[0].url}`;
          console.log('this.url = ', this.url);
          this.urlChange.emit(this.url);
        }
      };
      // xhr.withCredentials = true;
      xhr.open('post', `${this.target}/api/upload/`, true);
      xhr.send(fd);
    }
  }
}
