import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { Message } from 'primeng//api';

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
  public rolesEmpleados: any;
  public opcCubreRoles = false;
  public msgs: Message[] = [];
  public es: any;

  constructor( private servicioEmpleados: EmpleadosService,
               private servicioMovimientos: MovimientosService,
               private route: ActivatedRoute,
               private router: Router ) {
    if (this.route.routeConfig.path === 'editar/:id') {
        this.alta  = false;
        this.tituloForm = 'Modificación de movimientos';
    }
  }
  ngOnInit() {
    this. consultarRolesEmpleado();
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

    if (!this.alta) {
      const id = this.route.snapshot.paramMap.get('id');
      this.consultarMovimientoPorId(id);
    }
  }

  consultarRolesEmpleado(): void {
    this.servicioEmpleados.consultarRolesEmpleado().subscribe(d => {
        this.rolesEmpleados = d.data.roles;
    });
  }

  inicializarPantalla() {
    this.formMovimientos = this.inicializarFormulario();
    this.formMovimientos.get('fecha').markAsPristine();
  }

  inicializarFormulario(): FormGroup {
    return new FormGroup({
      idEmpleado: new FormControl({value: '', disabled: !this.alta},  Validators.required),
      nomEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      apellidoEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      rolEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      tipoEmpleado: new FormControl({value: '', disabled: true}, Validators.required),
      fecha: new FormControl({value: new Date(), disabled: !this.alta}, Validators.required),
      numEntregas: new FormControl('', Validators.required),
      idRolCubre: new FormControl({value: ''}, Validators.required),
      opcCubreRoles: new FormControl('', Validators.required)
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
    this.formMovimientos.get('fecha').markAsPristine();
    this.msgs = [];
    const idEmpleado = this.formMovimientos.get('idEmpleado').value;
    if ( isNaN(idEmpleado) ) {
      this.formMovimientos.get('idEmpleado').setValue('');
    } else if (idEmpleado) {
      this.servicioMovimientos.consultarEmpleado(idEmpleado).subscribe(d => {
        this.formMovimientos.setValue( d.data.empleado);
        if (d.data.empleado.opcCubreRoles === '0') {
          this.formMovimientos.get('idRolCubre').disable();
        } else {
          this.formMovimientos.get('idRolCubre').enable();
        }
      });
    }
  }

  formatoFechayymmdd( fecha ) {
    return fecha.getUTCFullYear() + '-' + (fecha.getUTCMonth() + 1) + '-' + fecha.getUTCDate();
  }

  consultarMovimiento() {
    const idEmpleado = this.formMovimientos.get('idEmpleado').value;

    const fecha = this.formatoFechayymmdd(this.formMovimientos.get('fecha').value);

    if (idEmpleado && fecha) {
      this.servicioMovimientos.consultarMovimiento(idEmpleado, fecha).subscribe( d => {
        if (d.data.movimiento !== null) {
          this.formMovimientos.get('numEntregas').setValue(d.data.movimiento.numEntregas);
          this.formMovimientos.get('idRolCubre').setValue(d.data.movimiento.idRolCubre);
        } else {
          this.formMovimientos.get('numEntregas').setValue('');
        }
      });
    }
  }

  consultarMovimientoPorId(idMovimiento) {
      if (idMovimiento) {
      this.servicioMovimientos.consultarMovimientoPorId(idMovimiento).subscribe( d => {
        if (d.data.movimiento !== null) {
          d.data.empleado.fecha = new Date(d.data.empleado.fecha);
          this.formMovimientos.setValue( d.data.empleado);
          if (d.data.empleado.opcCubreRoles === '0') {
            this.formMovimientos.get('idRolCubre').disable();
          } else {
            this.formMovimientos.get('idRolCubre').enable();
          }
        } else {
          this.router.navigateByUrl('/empleados');
        }
      });
    }
  }

  guardarMovimiento() {
    const movimiento  = this.formMovimientos.value;
    movimiento.fecha = this.formatoFechayymmdd(this.formMovimientos.get('fecha').value);
    if (movimiento.idRolCubre === undefined) {
      movimiento.idRolCubre = this.formMovimientos.get('idRolCubre').value;
    }
    if (movimiento.idEmpleado === undefined) {
      movimiento.idEmpleado = this.formMovimientos.get('idEmpleado').value;
    }

    this.servicioMovimientos.guardarMovimiento(movimiento).subscribe( d => {
      if (this.alta) {

        this.inicializarPantalla();
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Se grabó el movimiento '});
      } else {
        this.router.navigateByUrl('/movimientos');
      }
    });
  }
}
