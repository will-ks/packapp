import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { isDevMode } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  httpOptions = {
    withCredentials: true,
    headers: null
  };
  form = {
    appName: '',
    url: 'http://',
    splashScreen: null,
    launcherIcon: null,
    primaryColor: '#29b6f6',
    secondaryColor: '#0086c3',
    camera: false,
    externalUrls: true,
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
  cropperImagesFiles = {
    splashScreen: null,
    launcherIcon: null
  };
  cropperImagesBase64 = {
    splashScreen: null,
    launcherIcon: null
  };
  fileInputFiles = {
    splashScreen: null,
    launcherIcon: null
  };
  feedbackEnabled = false;
  submitted = false;
  submitError = false;

  private baseUrl = `${environment.server}/builds`;

  constructor(
    private httpClient: HttpClient,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {}

  // --- Controller API --- //

  handleNextStep(form) {
    if (this.step === this.numberOfSteps) {
      this.handleSubmit();
      return null;
    }
    if (form.valid) {
      this.step++;
      this.feedbackEnabled = false;
    } else {
      this.feedbackEnabled = true;
    }
  }

  handlePreviousStep() {
    this.feedbackEnabled = false;
    this.step--;
  }

  handleSubmit() {
    this.submitted = true;
    this.submitError = false;
    this.postData()
      .then(result => {
        const id = result.id;
        this.router.navigate([`/build/${id}`]);
      })
      .catch(err => {
        console.log(err);
        this.submitError = true;
        this.submitted = false;
      });
  }

  // --- Utility Functions --- //

  async postData() {
    const data = this.form;
    try {
      await this.uploadFile(
        this.cropperImagesFiles.splashScreen,
        this.form.splashScreen
      );
      await this.uploadFile(
        this.cropperImagesFiles.launcherIcon,
        this.form.launcherIcon
      );
      return this.httpClient
        .post(this.baseUrl, data, this.httpOptions)
        .toPromise();
    } catch (err) {
      console.log(err);
      this.submitError = true;
      this.submitted = false;
    }
  }

  uploadFile(file, filename) {
    const ref = this.storage.ref(filename);
    return ref.put(file);
  }

  setStep(step: number) {
    this.feedbackEnabled = false;
    this.step = step;
  }

  fileChangeEvent(event: any, file: string): void {
    this.cropperImageChangedEvents[file] = event;
  }

  imageCropped(event: ImageCroppedEvent, file: string) {
    this.cropperImagesBase64[file] = event.base64;
    this.cropperImagesFiles[file] = event.file;
    this.form[file] = `${new Date().getTime()}0000${Math.floor(
      Math.random() * 9999 + 1
    )}`;
  }

  isProduction() {
    return !isDevMode();
  }
}
