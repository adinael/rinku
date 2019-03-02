import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/empleado';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  public formEmpleados: FormGroup;
  public rolesEmpleados: any;
  public tiposEmpleados: any;

  @ViewChild('name') name: ElementRef;
  constructor(
    private servicioEmpleados: EmpleadosService) { }

  ngOnInit() {
    this. consultarRolesEmpleado();
    this.consultarTiposEmpleado();
    this.formEmpleados = this.inicializarFormulario();
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
    this.servicioEmpleados.guardar(this.formEmpleados.value).subscribe( d => {
      this.formEmpleados = this.inicializarFormulario();
      this.name.nativeElement.focus();
    });
  }
}
