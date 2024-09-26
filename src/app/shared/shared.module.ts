import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CountryDetailModalComponent } from './components/country-detail-modal/country-detail-modal.component';
import { LoadingSpinerComponent } from './components/loadingSpiner/loadingSpiner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBoxComponent } from './components/searchBox/searchBox.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Error404Component } from './pages/error404/error404.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    NavbarComponent,
    Error404Component,
    LoadingSpinerComponent,
    SidebarComponent,
    SearchBoxComponent,
    CountryDetailModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    NavbarComponent,
    Error404Component,
    LoadingSpinerComponent,
    SidebarComponent,
    SearchBoxComponent,
    CountryDetailModalComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ],
})
export class SharedModule {}
