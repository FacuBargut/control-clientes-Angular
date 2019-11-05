import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  permitirRegistro = false;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  save(){
    
  }

}
