import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private buildService: BuildService) {
    this.buildId = this.route.snapshot.params.id;
  }

  ngOnInit() {}

  handleStartBuilding() {
    this.waiting = true;
    this.error = false;
    const data = {
      building: true
    };
    this.buildService.update(this.buildId, data)
      .then(() => {
        this.waiting = false;
        this.building = true;
      })
      .catch(err => {
        console.log(err);
        this.waiting = false;
        this.error = true;
      });
  }


}
