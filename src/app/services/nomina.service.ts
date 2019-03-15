import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NominaService {

  private cnfg: any;

  constructor(private http: HttpClient, config: ConfigService) {
      this.cnfg = config.getConfig();
   }

  consultarMovimientosEmpleadoMes(idEmpleado: number, anio: number, mes: number): any {
    return this.http.get(`${this.cnfg.apiRinku}/nominas/empleados/${idEmpleado}/anios/${anio}/meses/${mes}`);
  }
}
