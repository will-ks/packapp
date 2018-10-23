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
  private buildId: string;

  constructor(
    private buildService: BuildService,
    private route: ActivatedRoute
  ) {
    this.buildId = this.route.snapshot.params.id;
    this.buildService.get(this.buildId).then((result: any) => {
      this.downloadUrl = result.downloadUrl;
    });
  }

  ngOnInit() {}
}
