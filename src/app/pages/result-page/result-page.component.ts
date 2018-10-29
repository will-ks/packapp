import { Component, OnInit } from '@angular/core';
import { BuildService } from 'src/app/services/build.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  public downloadUrl: string;
  public sourceDownloadUrl: string;
  private buildId: string;
  public userEmail: string;
  public submitted = false;

  constructor(
    private buildService: BuildService,
    private route: ActivatedRoute
  ) {
    this.buildId = this.route.snapshot.params.id;
    this.buildService.get(this.buildId).then((result: any) => {
      this.downloadUrl = result.downloadUrl;
      this.sourceDownloadUrl = result.sourceDownloadUrl;
    });
  }

  ngOnInit() {}

  handleSubmit(form) {
    if (form.valid) {
      this.buildService.submitEmail(this.buildId, this.userEmail).then(() => {
        this.submitted = true;
      });
    }
  }
}
