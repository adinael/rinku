import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private cnfg: any;

  constructor(
    private http: HttpClient,
    private config: ConfigService) {
      this.cnfg = config.getConfig();
   }

   public consultarEmpleados(): Observable<any> {
    return this.http.get(this.cnfg.apiRinku + '/empleados');
   }

   public eliminarEmpleado(idEmpleado: number): Observable<any> {
     console.log(this.cnfg.apiRinku + '/empleados/' + idEmpleado);
     return this.http.delete(this.cnfg.apiRinku + '/empleados/' + idEmpleado);
   }

   public consultarRolesEmpleado(): Observable<any> {
    return this.http.get(this.cnfg.apiRinku + '/empleados/roles');
   }

   public consultarTiposEmpleado(): Observable<any> {
    return this.http.get(this.cnfg.apiRinku + '/empleados/tipos');
   }

  public guardar(empleado: Empleado): Observable<any> {
    return this.http.post(this.cnfg.apiRinku + '/empleados', empleado);
  }
}
