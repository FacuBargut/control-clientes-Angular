import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  // customers: Customer[];
  customer: Customer ={
    name: '',
    apellido: '',
    email: '',
    saldo: 0
  }

    id: string;

  constructor( private customerService: ClienteService,
               private flashMessages: FlashMessagesService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id).subscribe( customer =>{
      this.customer = customer;
      console.log(this.customer)
    } )
  }

}
