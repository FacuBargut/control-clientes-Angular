import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor( private router: Router,
               private flashMessages: FlashMessagesService,
               private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(
      auth =>{
        if(auth){
          this.router.navigate(['/']);
        }
      }
    )
  }

  register(){
    this.loginService.checkIn(this.email, this.password)
      .then( res=> {
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.flashMessages.show( error.messages, {
          cssClass: 'alert-danger'  , timeout: 4000
        });
      });
  }

}
