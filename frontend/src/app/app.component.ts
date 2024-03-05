import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppThemeService } from './services/appTheme/app-theme.service';
import { AnalyticsService } from './services/analytics/analytics.service';
import { EventLog } from './interfaces/event-log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {
  themeSubscription: Subscription = new Subscription();

  constructor(
    private analyticsService: AnalyticsService,
    public themeService: AppThemeService
  ) {}

  ngOnInit(): void {
    this.logAnalyticEvent('AppComponent Initialized', {
      message: 'AppComponent has been initialized.',
    });
  }

  ngOnDestroy(): void {
    this.logAnalyticEvent('AppComponent Destroyed', {
      message: 'AppComponent has been destroyed.',
    });
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private logAnalyticEvent(eventName: string, eventData: any): void {
    const analytic: EventLog = {
      event_name: eventName,
      event_data: eventData,
      ip_address: '',
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      page_url: window.location.pathname,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.analyticsService.getUserIpAddress().subscribe({
      next: (ip) => {
        analytic.ip_address = ip;
        this.analyticsService.logEvent(analytic).subscribe({
          next: (loggedAnalytic) => {
            console.log('Logged analytic:', loggedAnalytic);
          },
          error: (error) => {
            console.error('Error logging analytic:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error getting IP address:', error);
      },
    });
  }

  title = 'iMerch Platform';
}
