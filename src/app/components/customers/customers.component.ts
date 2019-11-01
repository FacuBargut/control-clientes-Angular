import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Customer } from 'src/app/models/customer.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  customer: Customer ={
    name: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  constructor(private customersService: ClienteService,
              private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      customers =>{
        this.customers = customers;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.customers){
      this.customers.forEach( customer => {
        saldoTotal += customer.saldo
      })
    }

    return saldoTotal;  

  }

  addCustomer( {value, valid}: {value: Customer, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeOut: 4000
      });
    }else{
      //Agregar el nuevo cliente
    }
  }

}
