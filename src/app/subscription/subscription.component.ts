import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {Subscription} from './subscription.model';
import {SubscriptionService} from './subscription.service';
import {AuthService} from '../auth/auth.service';
import {Auth} from '../auth/auth.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styles: [`
        *{
            color:black;
        }
        button{
            color: white;
            border: 0px;
            background: linear-gradient(to right, #671E9D , #03AEF1);
        }
        button:hover{
            color: white;
            border: 0px;
            background: linear-gradient(to right,#03AEF1  , #671E9D);
        }
        a.red{
            background: linear-gradient(to right, #671E9D , #03AEF1);
            color: white;
            margin-right: 20px;
        }
        .red .red:hover{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .red .red:active{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
        .tabs{
            float:right;
            height:20px;
        }
        .buttons{
            float:right;
        }
        .dropdown{
            float:left;
        }
        .credit-tab{
            min-height:30px;
        }
        .credit-value{
            float:left;
            padding-top:5px;
        }
        .card-tab .new div{
            float:left;
        }
        .card-tab .new button{
            float:right;
        }
        .card-tab .new{
            width:100%;
        }
        .card-tab .current{
            width:100%;
        }
        .card-tab{
            width:100%;
        }
        .card-button{
            /*!*#FF9900*! Oranje*/
            /*#363636 Grijs*/
            border-radius: 25px;
            color: white;
            padding: 5px 10px;
            text-align: center;
            display: inline-block;
            margin: 4px 2px;
        }
        .properties-tab{
            clear: both;
            width:100%;
            min-height:150px;
        }
        .properties-tab label{
            min-width:150px;
        }
        .properties-tab button{
            clear: both;
            float:right;
        }
        .subscription-tab{
            clear: both;
            width:100%;
            min-height:50px;
        }
        footer{
            clear: both;
        }
    `]
})

export class SubscriptionComponent implements OnInit {

  public credit = 0;
  public subscriptionPlan;
  public tab: string;
  @Input() subscription: Subscription;
  @Input() auths: Auth;

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    public authService: AuthService
  ) {}


  ngOnInit() {
    /*get all auths*/
    this.authService.getAuths()
      .subscribe(

        (data: any) => {
          this.auths = data.obj;
        },
        error => console.error(error)
      );

  }

  /*edit the subscription*/
  onEdit() {
    this.subscriptionService.editSubscription(this.subscription)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
  }
  /*delete the subscription*/
  onDelete() {
    const myConfirm = confirm('Wilt u "' + this.subscription.name + '" echt verwijderen?');
    if (myConfirm === false) { return; }
    this.subscriptionService.deleteSubscription(this.subscription)
      .subscribe(
        result => console.log(result),
        error => console.error(error)
      );
  }
  /*add the subscription from the auth*/
  addSubscription(auth: Auth) {
    this.authService.addAuthSubscription(auth, this.subscription)
      .subscribe(
        result  => console.log (result),
        error => console.error (error)
      );
  }

  /*remove the subscription from the auth*/
  removeSubscription(auth: Auth) {
    this.authService.removeAuthSubscription(auth, this.subscription)
      .subscribe(
        result => console.log   (result),
        error => console.error  (error)
      );
  }
  /*Check if the subscription of the auth is the same as the sub that is there*/
  checkIfValid(auth: any, sub: any) {
    let out = false;
    for (const subscription of auth) {
      if (subscription === sub) {
        out = true;
        return out;
      } 
      return out;
    }
  }
}
