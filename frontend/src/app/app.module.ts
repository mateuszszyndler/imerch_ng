import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkMenuModule } from '@angular/cdk/menu';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';

//import  AppleSigninAuthService  from 'apple-signin-auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgIconsModule } from '@ng-icons/core';
import {
  lucideSearch,
  lucideLightbulb,
  lucideAlignJustify,
  lucideAlignLeft,
  lucideAlignRight,
  lucideApple,
  lucideArrowBigLeft,
  lucideArrowBigRight,
  lucideArrowBigUp,
  lucideArrowBigDown,
  lucideBarChart2,
  lucideBox,
  lucideCheck,
  lucideClipboard,
  lucideClock2,
  lucideCloud,
  lucideCode,
  lucideCodesandbox,
  lucideCornerDownLeft,
  lucideCornerDownRight,
  lucideCornerLeftDown,
  lucideCornerLeftUp,
  lucideCornerRightDown,
  lucideCornerRightUp,
  lucideCornerUpLeft,
  lucideCornerUpRight,
  lucideCrop,
  lucideDatabase,
  lucideDatabaseBackup,
  lucideDownload,
  lucideDollarSign,
  lucideDownloadCloud,
  lucideDroplet,
  lucideDroplets,
  lucideEdit,
  lucideFacebook,
  lucideInstagram,
  lucideTwitter,
  lucideTwitch,
  lucideGithub,
  lucideGitlab,
  lucideLinkedin,
  lucideYoutube,
  lucideEraser,
  lucideExpand,
  lucideFilter,
  lucideFilterX,
  lucideFlame,
  lucideFolder,
  lucideFolderCog,
  lucideFolderCheck,
  lucideFrame,
  lucideHash,
  lucideHeart,
  lucideHexagon,
  lucideHome,
  lucideImage,
  lucideInbox,
  lucideInspect,
  lucideLeaf,
  lucideLayers,
  lucideLayout,
  lucideLayoutDashboard,
  lucideLayoutGrid,
  lucideLink,
  lucideLock,
  lucideLogIn,
  lucideLogOut,
  lucideMail,
  lucideMailCheck,
  lucideMaximize,
  lucideMessageCircle,
  lucideMonitor,
  lucidePackage,
  lucidePalette,
  lucidePhone,
  lucidePlusCircle,
  lucidePlusSquare,
  lucideQrCode,
  lucideReceipt,
  lucideReplace,
  lucideReplaceAll,
  lucideRotateCcw,
  lucideRotateCw,
  lucideRss,
  lucideScissors,
  lucideServer,
  lucideSettings2,
  lucideShare2,
  lucideSave,
  lucideSlidersHorizontal,
  lucideSliders,
  lucideTag,
  lucideTerminal,
  lucideTextCursorInput,
  lucideTrash,
  lucideUnlock,
  lucideUpload,
  lucideUploadCloud,
  lucideUser,
  lucideUsers,
  lucideUserPlus,
  lucideUserMinus,
  lucideUserCheck,
  lucideUserX,
  lucideXCircle,
  lucideXOctagon,
  lucideZoomIn,
  lucideZoomOut,
  lucideZap,
  lucideWand2,
  lucideWholeWord,
  lucideShirt,
  lucideTruck,
  lucideView,
  lucideThumbsUp,
  lucideStar,
  lucidePower,
  lucidePowerOff,
  lucideQuote,
  lucideShoppingCart,
  lucideArrowRight,
  lucideArrowLeft,
} from '@ng-icons/lucide';
import {
  ionHeartSharp,
  ionHeartOutline,
  ionStarSharp,
  ionStarOutline,
} from '@ng-icons/ionicons';
import { AdminComponent } from './components/admin/admin.component';
import { AdminConfigurationComponent } from './components/admin/admin-configuration/admin-configuration.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminDesignsComponent } from './components/admin/admin-designs/admin-designs.component';
import { AdminFinanceComponent } from './components/admin/admin-finance/admin-finance.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminInventoryComponent } from './components/admin/admin-inventory/admin-inventory.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminPartnersComponent } from './components/admin/admin-partners/admin-partners.component';
import { AdminPredefinedComponent } from './components/admin/admin-predefined/admin-predefined.component';
import { AdminPrintsComponent } from './components/admin/admin-prints/admin-prints.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminStorageComponent } from './components/admin/admin-storage/admin-storage.component';
import { AdminStoresComponent } from './components/admin/admin-stores/admin-stores.component';
import { AdminSubscriptionComponent } from './components/admin/admin-subscription/admin-subscription.component';
import { AdminSupportComponent } from './components/admin/admin-support/admin-support.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginCallbackComponent } from './components/auth/login/login-callback/login-callback.component';
import { LoginChangeComponent } from './components/auth/login/login-change/login-change.component';
import { LoginRefreshComponent } from './components/auth/login/login-refresh/login-refresh.component';
import { LoginResetComponent } from './components/auth/login/login-reset/login-reset.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterCallbackComponent } from './components/auth/register/register-callback/register-callback.component';
import { RegisterPolicyComponent } from './components/auth/register/register-policy/register-policy.component';
import { ClientComponent } from './components/client/client.component';
import { ClientCartsComponent } from './components/client/client-carts/client-carts.component';
import { ClientCommentsComponent } from './components/client/client-comments/client-comments.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { ClientFinanceComponent } from './components/client/client-finance/client-finance.component';
import { ClientFooterComponent } from './components/client/client-footer/client-footer.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { ClientHistoryComponent } from './components/client/client-history/client-history.component';
import { ClientOrdersComponent } from './components/client/client-orders/client-orders.component';
import { ClientProfileComponent } from './components/client/client-profile/client-profile.component';
import { ClientWishlistComponent } from './components/client/client-wishlist/client-wishlist.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { HomeBenefitsComponent } from './components/home/home-benefits/home-benefits.component';
import { HomeBlogComponent } from './components/home/home-blog/home-blog.component';
import { HomeCommentsComponent } from './components/home/home-comments/home-comments.component';
import { HomeFaqComponent } from './components/home/home-faq/home-faq.component';
import { HomeFooterComponent } from './components/home/home-footer/home-footer.component';
import { HomeGalleryComponent } from './components/home/home-gallery/home-gallery.component';
import { HomeHeaderComponent } from './components/home/home-header/home-header.component';
import { HomeHeroComponent } from './components/home/home-hero/home-hero.component';
import { HomePlansComponent } from './components/home/home-plans/home-plans.component';
import { HomeSponsorsComponent } from './components/home/home-sponsors/home-sponsors.component';
import { HomeStepsComponent } from './components/home/home-steps/home-steps.component';
import { HomeStoresComponent } from './components/home/home-stores/home-stores.component';
import { HomeVideoComponent } from './components/home/home-video/home-video.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PartnerComponent } from './components/partner/partner.component';
import { PartnerDashboardComponent } from './components/partner/partner-dashboard/partner-dashboard.component';
import { PartnerDesignsComponent } from './components/partner/partner-designs/partner-designs.component';
import { PartnerFinanceComponent } from './components/partner/partner-finance/partner-finance.component';
import { PartnerFooterComponent } from './components/partner/partner-footer/partner-footer.component';
import { PartnerHeaderComponent } from './components/partner/partner-header/partner-header.component';
import { PartnerOrdersComponent } from './components/partner/partner-orders/partner-orders.component';
import { PartnerProductsComponent } from './components/partner/partner-products/partner-products.component';
import { PartnerProfileComponent } from './components/partner/partner-profile/partner-profile.component';
import { PartnerReportsComponent } from './components/partner/partner-reports/partner-reports.component';
import { PartnerStoresComponent } from './components/partner/partner-stores/partner-stores.component';
import { PartnerThemesComponent } from './components/partner/partner-themes/partner-themes.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDesignComponent } from './components/product/product-design/product-design.component';
import { ProductDesignerComponent } from './components/product/product-designer/product-designer.component';
import { ProductDesignsComponent } from './components/product/product-designs/product-designs.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductFooterComponent } from './components/product/product-footer/product-footer.component';
import { ProductHeaderComponent } from './components/product/product-header/product-header.component';
import { ProductPredefinedComponent } from './components/product/product-predefined/product-predefined.component';
import { ProductProductsComponent } from './components/product/product-products/product-products.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { StoreComponent } from './components/store/store.component';
import { StoreBannerComponent } from './components/store/store-banner/store-banner.component';
import { StoreCartComponent } from './components/store/store-cart/store-cart.component';
import { StoreCartModalComponent } from './components/store/store-cart-modal/store-cart-modal.component';
import { StoreDetailsComponent } from './components/store/store-details/store-details.component';
import { StoreFiltersComponent } from './components/store/store-filters/store-filters.component';
import { StoreFooterComponent } from './components/store/store-footer/store-footer.component';
import { StoreHeaderComponent } from './components/store/store-header/store-header.component';
import { StoreInfoComponent } from './components/store/store-info/store-info.component';
import { StoreProductsComponent } from './components/store/store-products/store-products.component';
import { SupportComponent } from './components/support/support.component';
import { SupportChatComponent } from './components/support/support-chat/support-chat.component';
import { SupportHistoryComponent } from './components/support/support-history/support-history.component';
import { SupportKnowledgeComponent } from './components/support/support-knowledge/support-knowledge.component';
import { SupportTicketComponent } from './components/support/support-ticket/support-ticket.component';
import { environment } from 'src/environments/environment.development';
import { ReplacePipePipe } from './pipes/replace-pipe.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminConfigurationComponent,
    AdminDashboardComponent,
    AdminDesignsComponent,
    AdminFinanceComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminInventoryComponent,
    AdminPanelComponent,
    AdminPartnersComponent,
    AdminPredefinedComponent,
    AdminPrintsComponent,
    AdminProductsComponent,
    AdminStorageComponent,
    AdminStoresComponent,
    AdminSubscriptionComponent,
    AdminSupportComponent,
    AdminUsersComponent,
    AuthComponent,
    LoginComponent,
    LoginCallbackComponent,
    LoginChangeComponent,
    LoginRefreshComponent,
    LoginResetComponent,
    RegisterComponent,
    RegisterCallbackComponent,
    RegisterPolicyComponent,
    ClientComponent,
    ClientCartsComponent,
    ClientCommentsComponent,
    ClientDashboardComponent,
    ClientFinanceComponent,
    ClientFooterComponent,
    ClientHeaderComponent,
    ClientHistoryComponent,
    ClientOrdersComponent,
    ClientProfileComponent,
    ClientWishlistComponent,
    HomeComponent,
    HomeAboutComponent,
    HomeBenefitsComponent,
    HomeBlogComponent,
    HomeCommentsComponent,
    HomeFaqComponent,
    HomeFooterComponent,
    HomeGalleryComponent,
    HomeHeaderComponent,
    HomeHeroComponent,
    HomePlansComponent,
    HomeSponsorsComponent,
    HomeStepsComponent,
    HomeStoresComponent,
    HomeVideoComponent,
    NotfoundComponent,
    NotificationComponent,
    PartnerComponent,
    PartnerDashboardComponent,
    PartnerDesignsComponent,
    PartnerFinanceComponent,
    PartnerFooterComponent,
    PartnerHeaderComponent,
    PartnerOrdersComponent,
    PartnerProductsComponent,
    PartnerProfileComponent,
    PartnerReportsComponent,
    PartnerStoresComponent,
    PartnerThemesComponent,
    ProductComponent,
    ProductDesignComponent,
    ProductDesignerComponent,
    ProductDesignsComponent,
    ProductDetailsComponent,
    ProductFooterComponent,
    ProductHeaderComponent,
    ProductPredefinedComponent,
    ProductProductsComponent,
    ProductCardComponent,
    StoreComponent,
    StoreBannerComponent,
    StoreCartComponent,
    StoreCartModalComponent,
    StoreDetailsComponent,
    StoreFiltersComponent,
    StoreFooterComponent,
    StoreHeaderComponent,
    StoreInfoComponent,
    StoreProductsComponent,
    SupportComponent,
    SupportChatComponent,
    SupportHistoryComponent,
    SupportKnowledgeComponent,
    SupportTicketComponent,
    ReplacePipePipe,
    TruncatePipe,
    SanitizeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    CdkMenuModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    OAuthModule.forRoot(),
    NgIconsModule.withIcons({
      lucideSearch,
      lucideLightbulb,
      lucideAlignJustify,
      lucideAlignLeft,
      lucideAlignRight,
      lucideApple,
      lucideArrowBigLeft,
      lucideArrowBigRight,
      lucideArrowBigUp,
      lucideArrowBigDown,
      lucideBarChart2,
      lucideBox,
      lucideCheck,
      lucideClipboard,
      lucideClock2,
      lucideCloud,
      lucideCode,
      lucideCodesandbox,
      lucideCornerDownLeft,
      lucideCornerDownRight,
      lucideCornerLeftDown,
      lucideCornerLeftUp,
      lucideCornerRightDown,
      lucideCornerRightUp,
      lucideCornerUpLeft,
      lucideCornerUpRight,
      lucideCrop,
      lucideDatabase,
      lucideDatabaseBackup,
      lucideDownload,
      lucideDollarSign,
      lucideDownloadCloud,
      lucideDroplet,
      lucideDroplets,
      lucideEdit,
      lucideFacebook,
      lucideInstagram,
      lucideTwitter,
      lucideTwitch,
      lucideGithub,
      lucideGitlab,
      lucideLinkedin,
      lucideYoutube,
      lucideEraser,
      lucideExpand,
      lucideFilter,
      lucideFilterX,
      lucideFlame,
      lucideFolder,
      lucideFolderCog,
      lucideFolderCheck,
      lucideFrame,
      lucideHash,
      lucideHeart,
      lucideHexagon,
      lucideHome,
      lucideImage,
      lucideInbox,
      lucideInspect,
      lucideLeaf,
      lucideLayers,
      lucideLayout,
      lucideLayoutDashboard,
      lucideLayoutGrid,
      lucideLink,
      lucideLock,
      lucideLogIn,
      lucideLogOut,
      lucideMail,
      lucideMailCheck,
      lucideMaximize,
      lucideMessageCircle,
      lucideMonitor,
      lucidePackage,
      lucidePalette,
      lucidePhone,
      lucidePlusCircle,
      lucidePlusSquare,
      lucideQrCode,
      lucideReceipt,
      lucideReplace,
      lucideReplaceAll,
      lucideRotateCcw,
      lucideRotateCw,
      lucideRss,
      lucideScissors,
      lucideServer,
      lucideSettings2,
      lucideShare2,
      lucideSave,
      lucideSlidersHorizontal,
      lucideSliders,
      lucideTag,
      lucideTerminal,
      lucideTextCursorInput,
      lucideTrash,
      lucideUnlock,
      lucideUpload,
      lucideUploadCloud,
      lucideUser,
      lucideUsers,
      lucideUserPlus,
      lucideUserMinus,
      lucideUserCheck,
      lucideUserX,
      lucideXCircle,
      lucideXOctagon,
      lucideZoomIn,
      lucideZoomOut,
      lucideZap,
      lucideWand2,
      lucideWholeWord,
      lucideShirt,
      lucideTruck,
      lucideView,
      lucideThumbsUp,
      lucideStar,
      ionHeartSharp,
      ionHeartOutline,
      ionStarSharp,
      ionStarOutline,
      lucidePower,
      lucidePowerOff,
      lucideQuote,
      lucideShoppingCart,
      lucideArrowRight,
      lucideArrowLeft,
    }),
  ],
  providers: [
    CookieService,
    GoogleSigninButtonDirective,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
