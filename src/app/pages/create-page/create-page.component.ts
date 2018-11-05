import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { isDevMode } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { BuildService } from 'src/app/services/build.service';

@Injectable({
  providedIn: 'root'
})
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

  constructor(
    private storage: AngularFireStorage,
    private router: Router,
    private buildService: BuildService
  ) {}

  ngOnInit() {}

  // --- Controller API --- //

  handleNextStep(form): void {
    if (this.step === this.numberOfSteps) {
      this.handleSubmit();
      return null;
    }
    if (form.valid) {
      this.step++;
      this.feedbackEnabled = false;
      window.scrollTo(0, 0);
    } else {
      this.feedbackEnabled = true;
    }
  }

  handlePreviousStep(): void {
    this.feedbackEnabled = false;
    this.step--;
  }

  handleSubmit(): void {
    this.submitted = true;
    this.submitError = false;
    this.postData()
      .then((result: any) => {
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

  async postData(): Promise<Object> {
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
      return this.buildService.create(data);
    } catch (err) {
      console.log(err);
      this.submitError = true;
      this.submitted = false;
    }
  }

  uploadFile(file, filename): AngularFireUploadTask {
    const ref = this.storage.ref(filename);
    return ref.put(file);
  }

  setStep(step: number): void {
    this.feedbackEnabled = false;
    this.step = step;
  }

  fileChangeEvent(event: any, file: string): void {
    this.cropperImageChangedEvents[file] = event;
  }

  imageCropped(event: ImageCroppedEvent, file: string): void {
    this.cropperImagesBase64[file] = event.base64;
    this.cropperImagesFiles[file] = event.file;
    this.form[file] = `${new Date().getTime()}0000${Math.floor(
      Math.random() * 9999 + 1
    )}`;
  }

  isProduction(): boolean {
    return !isDevMode();
  }
}
