import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-form-movimientos',
  templateUrl: './form-movimientos.component.html',
  styleUrls: ['./form-movimientos.component.css']
})
export class FormMovimientosComponent implements OnInit {
  public formMovimientos: FormGroup;
  public alta = true;
  public tituloForm = 'Alta de Movimientos';
  public numEmpleados: string[];

  constructor( private servicioEmpleados: EmpleadosService,
               private servicioMovimientos: MovimientosService ) { }
  public es: any;
  ngOnInit() {
    this.limpiarCampos();

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

  limpiarCampos() {
    this.formMovimientos = this.inicializarFormulario();
  }



  inicializarFormulario(): FormGroup {
    return new FormGroup({
      idEmpleado: new FormControl('', Validators.required),
      nomEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      apellidoEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      rolEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      tipoEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      fecha: new FormControl('', Validators.required),
      numeroEntregas: new FormControl('', Validators.required),
      idRolCubre: new FormControl('', Validators.required)
    });
  }

  buscarNumerosEmpleados(event) {
    if ( isNaN(event.query) ) {
      this.formMovimientos.get('idEmpleado').setValue('');
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

  consultarEmpleado() {
    const idEmpleado = this.formMovimientos.get('idEmpleado').value;
    if ( isNaN(idEmpleado) ) {
      this.formMovimientos.get('idEmpleado').setValue('');
    } else if (idEmpleado) {
      this.servicioMovimientos.consultarEmpleado(idEmpleado).subscribe(d => {
        this.formMovimientos.setValue( d.data.empleado);
      });
    }
  }

  consultarMovimiento() {
    const idEmpleado = this.formMovimientos.get('idEmpleado').value;
    const fecha = this.formMovimientos.get('fecha').value;
    if (idEmpleado && fecha) {
      this.servicioMovimientos.consultarMovimiento(idEmpleado, fecha).subscribe(d => {
        this.formMovimientos.setValue( d.data.empleado);
      });
    }
  }
}
