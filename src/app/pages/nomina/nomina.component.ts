import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EmpleadosService } from 'src/app/services/empleados.service';
import { NominaService } from 'src/app/services/nomina.service';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {

  public formNomina: FormGroup;
  public nombreColumnas: any;
  public datosNomina: [];
  public es: any;
  public numEmpleados: string[];

  constructor( private servicioEmpleados: EmpleadosService,
               private servicioNomina: NominaService) { }

  ngOnInit() {

    this.inicializarPantalla();
    // tslint:disable-next-line:max-line-length
    this.nombreColumnas = ['Nombre', 'Rol', 'Entregas', '$ Entregas', 'Bono', 'Sueldo Base', 'ISR', 'ISR Adicional', 'Sueldo Total', 'Vale Despensa', 'A Pagar'];
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
    this.formNomina = this.inicializarFormulario();
    this.datosNomina = [];
  }

  inicializarFormulario(): FormGroup {
    return new FormGroup({
      fecha: new FormControl('', Validators.required),
      idEmpleado: new FormControl('')
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

  limpiarEmpleado() {
    this.formNomina.get('idEmpleado').setValue('');
    this.consultarNomina();
  }

  consultarNomina() {

    if (this.formNomina.valid) {
      let idEmpleado = this.formNomina.get('idEmpleado').value;
      const anio = this.formNomina.get('fecha').value.getUTCFullYear();
      const mes = this.formNomina.get('fecha').value.getUTCMonth() + 1;

      if (!idEmpleado) {
        idEmpleado = 0;
      }
      this.servicioNomina.consultarMovimientosEmpleadoMes(idEmpleado, anio, mes).subscribe(d => {
        this.datosNomina = d.data.nomina;
        console.table(this.datosNomina);
      });
    }
  }

}
