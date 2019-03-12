import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-movimientos',
  templateUrl: './tabla-movimientos.component.html',
  styleUrls: ['./tabla-movimientos.component.css']
})
export class TablaMovimientosComponent implements OnInit {

  public nombreColumnas = ['#', 'Nombre', 'Apellido', 'Rol', 'Tipo', 'Acciones'];
  public datosMovimientos = [];

  constructor() { }

  ngOnInit() {
  }

}
