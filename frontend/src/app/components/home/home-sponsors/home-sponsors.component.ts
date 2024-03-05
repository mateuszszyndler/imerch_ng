import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home-sponsors',
  templateUrl: './home-sponsors.component.html',
  styleUrls: ['./home-sponsors.component.scss']
})
export class HomeSponsorsComponent  implements OnInit {
  sponsors?: Observable<Sponsor[]>;

  constructor() { }

  ngOnInit(): void {
    this.sponsors = this.loadFallbackImages();
  }
  getSponsors(): Observable<Sponsor[]> {
    // Insert your API url here
    return this.loadFallbackImages();
  }

  loadFallbackImages(): Observable<Sponsor[]> {
    return of([
      { name: 'Sponsor 1', logo: 'assets/images/partners/adidas.png' },
      { name: 'Sponsor 2', logo: 'assets/images/partners/amazon-pay.png' },
      { name: 'Sponsor 3', logo: 'assets/images/partners/apple.png' },
      { name: 'Sponsor 4', logo: 'assets/images/partners/netflix.png' },
      { name: 'Sponsor 5', logo: 'assets/images/partners/social.png' },
      // add more sponsors as needed
    ]);
  }
}

interface Sponsor {
  name: string;
  logo: string;
}
