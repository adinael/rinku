import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  public config: any;

  constructor(private http: HttpClient) {
    this.getJSON();
  }

  public getJSON() {
    return new Promise((resolve) => {
      this.http
        .get(environment.configFile)
        .subscribe((cnfg: any) => {
          this.config = cnfg;
          resolve();
        });
    });
  }

  public getConfig(): any {
    return this.config;
  }
}
