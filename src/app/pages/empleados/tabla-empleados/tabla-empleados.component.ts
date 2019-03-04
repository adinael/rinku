import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-tabla-empleados',
  templateUrl: './tabla-empleados.component.html',
  styleUrls: ['./tabla-empleados.component.css']
})
export class TablaEmpleadosComponent implements OnInit {

  public nombreColumnas = ['#', 'Nombre', 'Apellido', 'Edad', 'Rol', 'Tipo', 'Acciones'];
  public datosEmpleados = [];

  constructor(private servicioEmpleados: EmpleadosService) { }

  ngOnInit() {
    this.consultarEmpleados();
  }

  consultarEmpleados() {
    this.servicioEmpleados.consultarEmpleados().subscribe(d => {
        this.datosEmpleados = d.data.empleados;
      })
  }

  eliminarEmpleado(empleado) {
    this.servicioEmpleados.eliminarEmpleado(empleado.idEmpleado).subscribe(d => {
        if (d.data.response) {
          this.consultarEmpleados();
        }
      }
    );
  }
}
