import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuildPageComponent } from './pages/build-page/build-page.component';

// --- Routes --- //
const routes: Routes = [
  {
    path: '',
    component: CreatePageComponent
  },
  {
    path: 'build/:id',
    component: BuildPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CreatePageComponent,
    NavbarComponent,
    FooterComponent,
    BuildPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ColorPickerModule,
    ImageCropperModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
