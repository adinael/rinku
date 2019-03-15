import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private cnfg: any;

  constructor(
    private http: HttpClient,
    config: ConfigService) {
      this.cnfg = config.getConfig();
   }

   public consultarEmpleado(idEmpleado): Observable<any> {
    return this.http.get(this.cnfg.apiRinku + '/movimientos/empleados/' + idEmpleado);
   }

   consultarMovimiento(idEmpleado: any, fecha: any): any {
    return this.http.get(this.cnfg.apiRinku + '/movimientos/empleados/' + idEmpleado + '/fechas/' + fecha);
  }


  consultarMovimientoPorId(idMovimiento): any {
    return this.http.get(`${this.cnfg.apiRinku}/movimientos/${idMovimiento}`);
  }

  consultarMovimientosEmpleadoMes(idEmpleado: number, anio: number, mes: number): any {
    return this.http.get(`${this.cnfg.apiRinku}/movimientos/empleados/${idEmpleado}/anios/${anio}/meses/${mes}`);
  }

  guardarMovimiento(movimiento: any): any {
   return this.http.post(this.cnfg.apiRinku + '/movimientos/', movimiento);
  }

  eliminarMovimiento(idMovimiento): any {
    return this.http.delete(`${this.cnfg.apiRinku}/movimientos/${idMovimiento}`);
  }
}
