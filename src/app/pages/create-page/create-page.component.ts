import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form = {
    appName: '',
    url: 'http://',
    splashScreen: null,
    launcherIcon: null,
    primaryColor: '#29b6f6',
    secondaryColor: '#0086c3',
    camera: false,
    externalUrls: false,
    gps: false,
    landscape: false,
    portrait: true,
    progressBar: false,
    ratingDays: 3,
    ratings: false,
    uploads: false,
    zoom: false
  };
  step = 1;
  numberOfSteps = 7;
  cropperImageChangedEvents = {
    splashScreen: null,
    launcherIcon: null
  };
  feedbackEnabled = false;

  constructor() {}

  ngOnInit() {}

  nextStep(form) {
    if (form.valid) {
      this.step++;
      this.feedbackEnabled = false;
    } else {
      this.feedbackEnabled = true;
    }
  }

  previousStep() {
    this.step--;
  }

  setStep(step: number) {
    this.step = step;
  }

  fileChangeEvent(event: any, file: string): void {
    this.cropperImageChangedEvents[file] = event;
  }
  imageCropped(event: ImageCroppedEvent, file: string) {
    this.form[file] = event.base64;
  }

  isProduction() {
    return !isDevMode();
  }
}
