import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void {
    console.log("Clicked");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success');
      }
    );

  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(
      params =>{
        let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente
          );
        }
      }
    );
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      cliente =>{
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success');
      }
    );
  }

}
