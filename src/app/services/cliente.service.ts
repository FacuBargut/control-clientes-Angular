import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument,AngularFirestore } from '@angular/fire/firestore'
import { Customer } from '../models/customer.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  customerCollection: AngularFirestoreCollection<Customer>
  customerDoc: AngularFirestoreDocument<Customer>
  customers: Observable<Customer[]>
  customer: Observable<Customer>

  constructor(private angularFirestore: AngularFirestore ) {
    this.customerCollection = angularFirestore.collection('clientes', ref => ref.orderBy('nombre','asc'));
  }
  //Hay que ver la documentacion de angular firestore
  getCustomers(): Observable<Customer[]>{
    //Obtengo los clientes
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map( cambios => {
          return cambios.map(
            accion =>{
              const datos = accion.payload.doc.data() as Customer
              datos.id = accion.payload.doc.id;
              return datos
            })
      })
    );
    return this.customers
  }

  addCustomer(customer:Customer){
      this.customerCollection.add(customer);
  }

  getCustomer( id:string ){
    this.customerDoc = this.angularFirestore.doc<Customer>(`clientes/${id}`);
    this.customer = this.customerDoc.snapshotChanges().pipe(
      map(
          action => {
            if( action.payload.exists === false){
                return null;
            }else{
              const data = action.payload.data() as Customer;
              data.id = action.payload.id;
              return data;
            }
        }));
    return this.customer;
  }

  editCustomer( customer:Customer){
    this.customerDoc = this.angularFirestore.doc(`clientes/${customer.id}`);
    this.customerDoc.update(customer);
  }

  deleteCustomer( customer: Customer ){
    this.customerDoc = this.angularFirestore.doc(`clientes/${customer.id}`);
    this.customerDoc.delete(  );
  }


}
