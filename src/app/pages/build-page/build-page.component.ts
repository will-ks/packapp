import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildService } from 'src/app/services/build.service';

@Component({
  selector: 'app-build-page',
  templateUrl: './build-page.component.html',
  styleUrls: ['./build-page.component.scss']
})
export class BuildPageComponent implements OnInit {
  private buildId: string;
  public building = false;
  public waiting = false;
  public error = false;
  public builtApk: string;
  public buildError: boolean;
  private intervalId: any;
  private pollNumber = 0;

  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private router: Router
  ) {
    this.buildId = this.route.snapshot.params.id;
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleStartBuilding() {
    this.waiting = true;
    this.error = false;
    const data = {
      building: true
    };
    this.buildService
      .update(this.buildId, data)
      .then(() => {
        this.waiting = false;
        this.building = true;
        this.intervalId = setInterval(this.pollStatus.bind(this), 1000 * 5);
      })
      .catch(err => {
        console.log(err);
        this.waiting = false;
        this.error = true;
      });
  }

  pollStatus() {
    this.buildService.poll(this.buildId).then((result: any) => {
      console.log(result);
      this.builtApk = result.builtApk;
      this.buildError = result.buildError;
      this.building = !result.builtApk;
      this.pollNumber++;
      if (this.builtApk) {
        this.router.navigate([`/result/${this.buildId}`]);
      }
      if (this.pollNumber > (10 * 60) / 5) {
        this.buildError = true;
        this.building = false;
        clearInterval(this.intervalId);
      }
    });
  }
}
