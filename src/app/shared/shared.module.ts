import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FooterComponent,
    PageWrapperComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    BreadcrumbsComponent,
    FooterComponent,
    PageWrapperComponent,
    SidebarComponent,
    HeaderComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
