import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Customer } from 'src/app/models/customer.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

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
  };

  @ViewChild("clienteForm",{static: false}) clienteForm: NgForm;
  @ViewChild("closeButton",{static: false}) closeButton: ElementRef;

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
      this.customersService.addCustomer(value);
      this.clienteForm.resetForm();
      this.closeModal();
    }
  }

  private closeModal(){
    this.closeButton.nativeElement.click();
  }

}
