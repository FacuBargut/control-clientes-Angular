import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  constructor(private customersService: ClienteService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      customers =>{
        this.customers = customers;
      }
    )
  }

}
