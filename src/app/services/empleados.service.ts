import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  
  constructor(
    private http : HttpClient) {
    
   }

  public guardar (empleado : Empleado): Observable<any> {
    return this.http.post('',empleado);
  }
}
