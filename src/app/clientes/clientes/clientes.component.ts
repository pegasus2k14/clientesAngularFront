import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
   clientes: Cliente[]=[];

   constructor(private clienteService: ClienteService){

   }

  ngOnInit(){
    this.clienteService.getClientes().subscribe(
     
        clientes => this.clientes = clientes
      );
  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: "Estas seguro?",
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            //Si el cliente es igual al cliente  q vamos a eliminar filtramos para q no se muestre en el listado
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            Swal.fire({
              title: "Eliminado",
              text: "Cliente eliminado con exito",
              icon: "success"
            });
          }
        );
      }
    });

  }
}


