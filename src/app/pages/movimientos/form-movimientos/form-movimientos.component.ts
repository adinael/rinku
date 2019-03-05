import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-form-movimientos',
  templateUrl: './form-movimientos.component.html',
  styleUrls: ['./form-movimientos.component.css']
})
export class FormMovimientosComponent implements OnInit {
  public formMovimientos: FormGroup;
  public alta = true;
  public tituloForm = 'Alta de Movimientos';

  constructor() { }

  ngOnInit() {
  }

}
