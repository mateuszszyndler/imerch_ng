import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.scss']
})
export class HomeVideoComponent {
  // Variable to store the path of video
  videoPath$: Observable<string>;

  constructor() {
    this.videoPath$ = this.getVideoPath();
  }

  getVideoPath(): Observable<string> {
    // Replace with actual logic to get video path
    return of('assets/video/mockup.mp4');
  }
}
