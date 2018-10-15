import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

// --- Routes --- //
const routes: Routes = [
  {
    path: '',
    component: CreatePageComponent
  }
];

@NgModule({
  declarations: [AppComponent, CreatePageComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
