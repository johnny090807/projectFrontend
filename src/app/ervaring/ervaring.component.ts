import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Ervaring} from './ervaring.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ervaring',
  templateUrl: './ervaring.component.html',
  styleUrls: ['./ervaring.component.css']
})
export class ErvaringComponent implements OnInit {
    myForm: FormGroup;
  constructor(private authService: AuthService,
              private router: Router) { }

    ngOnInit() {
        // Set formgroup variables
        this.myForm = new FormGroup({
            description: new FormControl(null, Validators.required),
            rating: new FormControl(null, Validators.required)
        });
    }
    onSubmit(){
      alert('Dankjewel voor je inzending!');
      const ervaring = new Ervaring(this.myForm.value.description, this.myForm.value.rating);
      this.authService.addUserErvaring(ervaring)
          .subscribe(
              (data:any)=>{
                  console.log(data);
                  this.router.navigateByUrl('/bedrijf')
              }
          )
    }
}
