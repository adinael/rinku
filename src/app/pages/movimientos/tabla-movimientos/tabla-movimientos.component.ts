import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EmpleadosService } from 'src/app/services/empleados.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
@Component({
  selector: 'app-tabla-movimientos',
  templateUrl: './tabla-movimientos.component.html',
  styleUrls: ['./tabla-movimientos.component.css']
})
export class TablaMovimientosComponent implements OnInit {

  public tablaMovimientos: FormGroup;
  public nombreColumnas = ['#', 'Nombre', 'Rol', 'Fecha', 'Cantidad', 'Acciones'];
  public datosMovimientos = [];
  public numEmpleados: string[];
  public es: any;

  constructor( private servicioEmpleados: EmpleadosService,
               private servicioMovimientos: MovimientosService ) { }

  ngOnInit() {
    this.inicializarPantalla();

    this.es = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      // tslint:disable-next-line:max-line-length
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec' ],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy'
    };
  }

  inicializarPantalla() {
    this.tablaMovimientos = this.inicializarFormulario();
    this.datosMovimientos = [];
  }

  inicializarFormulario(): FormGroup {
    return new FormGroup({
      idEmpleado: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required)
    });
  }

  buscarNumerosEmpleados(event) {
    if ( isNaN(event.query) ) {
            this.numEmpleados = [];
    } else if (event.query) {
        this.servicioEmpleados.buscarEmpleados(event.query).subscribe(d => {
          this.numEmpleados = d.data.numerosempleado;
        });
    } else {
      this.servicioEmpleados.consultarNumerosEmpleado().subscribe(d => {
        this.numEmpleados = d.data.numerosempleado;
      });
    }
  }

  consultarMovimientosEmpleadoMes() {
    this.datosMovimientos = [];
    if (!this.tablaMovimientos.invalid) {

      const idEmpleado = this.tablaMovimientos.get('idEmpleado').value;
      const anio = this.tablaMovimientos.get('fecha').value.getUTCFullYear();
      const mes = this.tablaMovimientos.get('fecha').value.getUTCMonth() + 1;

      if (idEmpleado && anio && mes) {
        this.servicioMovimientos.consultarMovimientosEmpleadoMes(idEmpleado, anio, mes).subscribe(d => {
          this.datosMovimientos = d.data.response;
        });
      }

    }
  }

  eliminarMovimiento(movimiento) {
    this.servicioMovimientos.eliminarMovimiento(movimiento.idMovimiento).subscribe(d => {
      this.consultarMovimientosEmpleadoMes();
    });
  }

}
