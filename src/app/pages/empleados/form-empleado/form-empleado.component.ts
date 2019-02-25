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

  public formEmpleados : FormGroup;
  @ViewChild('test') test: ElementRef;
  constructor(
    private servicioEmpleados : EmpleadosService) { }

  ngOnInit() {
    this.formEmpleados = this.inicializarFormulario();
    this.test.nativeElement.focus();
  }

  inicializarFormulario(): FormGroup {
    return new FormGroup({
      id_empleado: new FormControl({value : '', disabled:true }, Validators.required),
      des_nombre: new FormControl('', Validators.required),
      des_apellido: new FormControl('', Validators.required),
      num_edad: new FormControl('1', Validators.required),
      num_tipo: new FormControl('1', Validators.required),
      id_rol: new FormControl('1', Validators.required)
    });
  }

  guardarEmpleado() : void {
    if ( this.formEmpleados.invalid ) {
      return;
     
    } 
    this.servicioEmpleados.guardar(this.formEmpleados.value).subscribe( d => {
      console.log("usuario agregado con exito");
      this.formEmpleados = this.inicializarFormulario();
    })
  }
}
