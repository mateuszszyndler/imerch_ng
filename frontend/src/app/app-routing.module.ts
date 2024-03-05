import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard as AuthGuard } from './services/authGuard/auth-guard.guard';
import { AdminConfigurationComponent } from './components/admin/admin-configuration/admin-configuration.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminDesignsComponent } from './components/admin/admin-designs/admin-designs.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminPartnersComponent } from './components/admin/admin-partners/admin-partners.component';
import { AdminPrintsComponent } from './components/admin/admin-prints/admin-prints.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminStorageComponent } from './components/admin/admin-storage/admin-storage.component';
import { AdminStoresComponent } from './components/admin/admin-stores/admin-stores.component';
import { AdminSupportComponent } from './components/admin/admin-support/admin-support.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginCallbackComponent } from './components/auth/login/login-callback/login-callback.component';
import { LoginChangeComponent } from './components/auth/login/login-change/login-change.component';
import { LoginResetComponent } from './components/auth/login/login-reset/login-reset.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterCallbackComponent } from './components/auth/register/register-callback/register-callback.component';
import { RegisterPolicyComponent } from './components/auth/register/register-policy/register-policy.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ClientCartsComponent } from './components/client/client-carts/client-carts.component';
import { ClientCommentsComponent } from './components/client/client-comments/client-comments.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { ClientFooterComponent } from './components/client/client-footer/client-footer.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { ClientOrdersComponent } from './components/client/client-orders/client-orders.component';
import { ClientProfileComponent } from './components/client/client-profile/client-profile.component';
import { ClientWishlistComponent } from './components/client/client-wishlist/client-wishlist.component';
import { ClientComponent } from './components/client/client.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { HomeBlogComponent } from './components/home/home-blog/home-blog.component';
import { HomeCommentsComponent } from './components/home/home-comments/home-comments.component';
import { HomeFooterComponent } from './components/home/home-footer/home-footer.component';
import { HomeHeaderComponent } from './components/home/home-header/home-header.component';
import { HomeHeroComponent } from './components/home/home-hero/home-hero.component';
import { HomePlansComponent } from './components/home/home-plans/home-plans.component';
import { HomeSponsorsComponent } from './components/home/home-sponsors/home-sponsors.component';
import { HomeStepsComponent } from './components/home/home-steps/home-steps.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PartnerDashboardComponent } from './components/partner/partner-dashboard/partner-dashboard.component';
import { PartnerDesignsComponent } from './components/partner/partner-designs/partner-designs.component';
import { PartnerFooterComponent } from './components/partner/partner-footer/partner-footer.component';
import { PartnerHeaderComponent } from './components/partner/partner-header/partner-header.component';
import { PartnerOrdersComponent } from './components/partner/partner-orders/partner-orders.component';
import { PartnerProductsComponent } from './components/partner/partner-products/partner-products.component';
import { PartnerProfileComponent } from './components/partner/partner-profile/partner-profile.component';
import { PartnerStoresComponent } from './components/partner/partner-stores/partner-stores.component';
import { PartnerThemesComponent } from './components/partner/partner-themes/partner-themes.component';
import { PartnerComponent } from './components/partner/partner.component';
import { ProductDesignComponent } from './components/product/product-design/product-design.component';
import { ProductDesignsComponent } from './components/product/product-designs/product-designs.component';
import { ProductFooterComponent } from './components/product/product-footer/product-footer.component';
import { ProductHeaderComponent } from './components/product/product-header/product-header.component';
import { ProductProductsComponent } from './components/product/product-products/product-products.component';
import { ProductComponent } from './components/product/product.component';
import { StoreCartModalComponent } from './components/store/store-cart-modal/store-cart-modal.component';
import { StoreCartComponent } from './components/store/store-cart/store-cart.component';
import { StoreFiltersComponent } from './components/store/store-filters/store-filters.component';
import { StoreFooterComponent } from './components/store/store-footer/store-footer.component';
import { StoreHeaderComponent } from './components/store/store-header/store-header.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';
import { StoreComponent } from './components/store/store.component';
import { SupportChatComponent } from './components/support/support-chat/support-chat.component';
import { SupportHistoryComponent } from './components/support/support-history/support-history.component';
import { SupportTicketComponent } from './components/support/support-ticket/support-ticket.component';
import { SupportComponent } from './components/support/support.component';
import { AdminFinanceComponent } from './components/admin/admin-finance/admin-finance.component';
import { ClientFinanceComponent } from './components/client/client-finance/client-finance.component';
import { PartnerFinanceComponent } from './components/partner/partner-finance/partner-finance.component';
import { HomeGalleryComponent } from './components/home/home-gallery/home-gallery.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'comments', component: HomeCommentsComponent },
      { path: 'footer', component: HomeFooterComponent },
      { path: 'gallery', component: HomeGalleryComponent },
      { path: 'header', component: HomeHeaderComponent },
      { path: 'hero', component: HomeHeroComponent },
      { path: 'blog', component: HomeBlogComponent },
      { path: 'about', component: HomeAboutComponent },
      { path: 'plans', component: HomePlansComponent },
      { path: 'steps', component: HomeStepsComponent },
      { path: 'sponsors', component: HomeSponsorsComponent },
    ],
  },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'login/reset', component: LoginResetComponent },
      { path: 'login/change', component: LoginChangeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register/callback', component: RegisterCallbackComponent },
      { path: 'register/policy', component: RegisterPolicyComponent },
      { path: 'auth/google/callback', component: LoginCallbackComponent },
      { path: 'auth/facebook/callback', component: LoginCallbackComponent },
      { path: 'auth/apple/callback', component: LoginCallbackComponent },
      // other routes...
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'configuration', component: AdminConfigurationComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'designs', component: AdminDesignsComponent },
      { path: 'finances', component: AdminFinanceComponent },
      { path: 'footer', component: AdminFooterComponent },
      { path: 'header', component: AdminHeaderComponent },
      { path: 'panel', component: AdminPanelComponent },
      { path: 'partners', component: AdminPartnersComponent },
      { path: 'prints', component: AdminPrintsComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'storage', component: AdminStorageComponent },
      { path: 'stores', component: AdminStoresComponent },
      { path: 'support', component: AdminSupportComponent },
      { path: 'users', component: AdminUsersComponent },
    ],
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'carts', component: ClientCartsComponent },
      { path: 'comments', component: ClientCommentsComponent },
      { path: 'dashboard', component: ClientDashboardComponent },
      { path: 'finances', component: ClientFinanceComponent },
      { path: 'footer', component: ClientFooterComponent },
      { path: 'header', component: ClientHeaderComponent },
      { path: 'orders', component: ClientOrdersComponent },
      { path: 'profile', component: ClientProfileComponent },
      { path: 'wishlist', component: ClientWishlistComponent },
    ],
  },
  //...
  { path: 'notification', component: NotificationComponent },
  {
    path: 'partner',
    component: PartnerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: PartnerDashboardComponent },
      { path: 'designs', component: PartnerDesignsComponent },
      { path: 'finances', component: PartnerFinanceComponent },
      { path: 'footer', component: PartnerFooterComponent },
      { path: 'header', component: PartnerHeaderComponent },
      { path: 'orders', component: PartnerOrdersComponent },
      { path: 'products', component: PartnerProductsComponent },
      { path: 'profile', component: PartnerProfileComponent },
      { path: 'stores', component: PartnerStoresComponent },
      { path: 'themes', component: PartnerThemesComponent },
    ],
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'design', component: ProductDesignComponent },
      { path: 'designs', component: ProductDesignsComponent },
      { path: 'details/:id', component: ProductDetailsComponent },
      { path: 'footer', component: ProductFooterComponent },
      { path: 'header', component: ProductHeaderComponent },
      { path: 'products', component: ProductProductsComponent },
    ],
  },
  {
    path: 'store/:storeName',
    component: StoreComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: 'cart', component: StoreCartComponent },
      { path: 'cart-modal', component: StoreCartModalComponent },
      { path: 'filters', component: StoreFiltersComponent },
      { path: 'footer', component: StoreFooterComponent },
      { path: 'header', component: StoreHeaderComponent },
      { path: 'products', component: StoreProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'support',
    component: SupportComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'chat', component: SupportChatComponent },
      { path: 'history', component: SupportHistoryComponent },
      { path: 'ticket', component: SupportTicketComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
