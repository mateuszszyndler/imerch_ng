import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { Theme } from '../../../interfaces/theme';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-store-banner',
  templateUrl: './store-banner.component.html',
  styleUrls: ['./store-banner.component.scss']
})
export class StoreBannerComponent implements OnInit {

  @Input() themeId: string | null = null;
  theme: Theme | null = null;

  constructor(private themeService: ThemeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['themeId'] && changes['themeId'].currentValue) {
      this.loadTheme(changes['themeId'].currentValue);
    }
  }

  loadTheme(id: string): void {
    this.themeService.getThemeById(id).pipe(
      tap(theme => this.theme = theme),
      catchError(error => {
        console.error('Failed to fetch theme:', error);
        return of(null);
      })
    ).subscribe();
  }

  ngOnInit(): void {
    if (this.themeId) {
      this.loadTheme(this.themeId);
    }
  }

}
