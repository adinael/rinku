import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/empleado';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  public formEmpleados: FormGroup;
  public rolesEmpleados: any;
  public tiposEmpleados: any;
  public numerosEmpleado: any;
  public alta = true;
  public titulloForm = 'Alta de Empleados';

  @ViewChild('name') name: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioEmpleados: EmpleadosService) {
      if (this.route.routeConfig.path !== 'nuevo') {
        this.alta  = false;
        this.titulloForm = 'Modificación de Empleados'
      }
     }

  ngOnInit() {
    this.formEmpleados = this.inicializarFormulario();
    this. consultarRolesEmpleado();
    this.consultarTiposEmpleado();
    this.consultarNumerosEmpleado();
    if (this.alta) {
      this.consultarSiguienteNumeroEmpleado();
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.consultarEmpleado(id);
    }

    this.name.nativeElement.focus();
  }

  inicializarFormulario(): FormGroup {
    return new FormGroup({
      idEmpleado: new FormControl({value : '', disabled: true }),
      nomEmpleado: new FormControl('', Validators.required),
      apellidoEmpleado: new FormControl('', Validators.required),
      numEdad: new FormControl('', Validators.required),
      idRol: new FormControl('1', Validators.required),
      idTipo: new FormControl('1', Validators.required)
    });
  }

  consultarSiguienteNumeroEmpleado() {
    this.servicioEmpleados.consultarSiguienteNumeroEmpleado().subscribe(d => {
      this.formEmpleados.get('idEmpleado').setValue(d.data.numeroempleado);
    });
  }

  consultarNumerosEmpleado() {
    this.servicioEmpleados.consultarNumerosEmpleado().subscribe(d => {
      this.numerosEmpleado = d.data.numeroempleado;
    });
  }

  consultarEmpleado(idEmpleado) {
    this.servicioEmpleados.consultarEmpleado(idEmpleado).subscribe(d => {
      this.formEmpleados.setValue(d.data.empleado);
    });
  }

  consultarRolesEmpleado(): void {
    this.servicioEmpleados.consultarRolesEmpleado().subscribe(d => {
        this.rolesEmpleados = d.data.roles;
    });
  }

  consultarTiposEmpleado(): void {
    this.servicioEmpleados.consultarTiposEmpleado().subscribe(d => {
        this.tiposEmpleados = d.data.tipos;
    });
  }

  onChangeRol(rol) {
    this.formEmpleados.get('idRol').setValue(rol.idRol);
  }

  onChanceTipo(tipo) {
    this.formEmpleados.get('idTipo').setValue(tipo.idTipo);
  }

  guardarEmpleado(): void {
    if ( this.formEmpleados.invalid ) {
      return;
    }

    if(this.alta){
      this.servicioEmpleados.guardar(this.formEmpleados.value).subscribe( d => {
        this.router.navigateByUrl('/empleados');
      });
    } else {
      this.servicioEmpleados.actualizar(this.route.snapshot.paramMap.get('id'), this.formEmpleados.value).subscribe( d => {
        if(d.data.empleado !== undefined) {
          this.router.navigateByUrl('/empleados');
        }
      });
    }
  }
}
