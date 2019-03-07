import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private cnfg: any;

  constructor(
    private http: HttpClient,
    private config: ConfigService) {
      this.cnfg = config.getConfig();
   }

   public consultarEmpleado(idEmpleado): Observable<any> {
    return this.http.get(this.cnfg.apiRinku + '/movimientos/empleados/' + idEmpleado);
   }

   consultarMovimiento(idEmpleado: any, fecha: any): any {
    return this.http.get(this.cnfg.apiRinku + '/movimientos/empleados/' + idEmpleado + '/fechas/' + fecha);
  }

  guardarMovimiento(movimiento: any): any {
   return this.http.post(this.cnfg.apiRinku + '/movimientos/', movimiento);
  }
}
