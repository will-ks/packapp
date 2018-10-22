import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
  private baseUrl = `${environment.server}/builds`;
  private httpOptions = {
    withCredentials: true,
    headers: null
  };

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.buildId = this.route.snapshot.params.id;
  }

  ngOnInit() {}

  handleStartBuilding() {
    this.waiting = true;
    this.error = false;
    const data = {
      building: true
    };
    this.httpClient
      .put(`${this.baseUrl}/${this.buildId}`, data, this.httpOptions)
      .toPromise()
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
