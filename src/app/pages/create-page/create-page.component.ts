import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  nextStep() {
    this.step++;
  }

  setStep(step: number) {
    this.step = step;
  }
}
