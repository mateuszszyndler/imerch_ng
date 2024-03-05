import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../../interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit, OnDestroy {
  currentUser: User | null | undefined;
  currentUserRole: string | undefined;
  currentUserSubscription: Subscription = new Subscription();
  showMenu: boolean = false;

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    console.log('HomeHeaderComponent ngOnInit');
    this.listenToScrollEvent();

    // subscribe to changes of currentUser in AuthService
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      (user) => {
        console.log('currentUserSubscription:', user);
        this.currentUser = user;
        this.currentUserRole = this.getUserRole();
      }
    );

  // Close menu when user clicks outside of it
  fromEvent(document, 'click').subscribe((event: Event) => {
    const target = event.target as HTMLElement;
    if (!this.el.nativeElement.contains(target)) {
      this.closeMenu();
    }
  });
  }

  ngOnDestroy() {
    // unsubscribe when component is destroyed to prevent memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  private listenToScrollEvent() {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY),
        distinctUntilChanged()
      )
      .subscribe((currentScrollTop) => {
        this.toggleHeaderClass(currentScrollTop);
      });
  }

  private toggleHeaderClass(currentScrollTop: number) {
    if (currentScrollTop > 0) {
      this.el.nativeElement.firstChild.classList.add('scrolled');
    } else {
      this.el.nativeElement.firstChild.classList.remove('scrolled');
    }
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUserRole(): string | undefined {
    if (this.currentUser) {
      console.log('getUserRole:', this.currentUser.email);
      return this.currentUser.role;
    }
    return undefined;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  logout() {
    this.authService.logoutUser().subscribe();
  }
}
