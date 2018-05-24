import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';
import {ErrorService} from './errors/error.service';
import {UserService} from './user/user.service';
import {UsersComponent} from './user/users.component';
import {UserListComponent} from './user/user-list.component';
import {UserComponent} from './user/user.component';
import {UserIdentifierComponent} from './identifier/user-identifier.component';
import {FilterPipe} from './shared/filter.pipe';
import {PercentagePipe} from './shared/percentage.pipe';
import {IdentifierComponent} from './identifier/identifier.component';
import {UserIdentifierListComponent} from './identifier/user-identifier-list.component';
import {IdentifierService} from './identifier/identifier.service';
import {IdentifiersComponent} from './identifier/identifiers.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import {IdentifierAllComponent} from './identifier/Identifier-all.component';
import {SubscriptionService} from './subscription/subscription.service';
import {SubscriptionComponent} from './subscription/subscription.component';
import {SubscriptionsComponent} from './subscription/subscriptions.component';
import {SubscriptionInputComponent} from './subscription/subscription-input.component';
import {SubscriptionListComponent} from './subscription/subscription-list.component';
import {BedrijfInputComponent} from './bedrijf/bedrijf-input.component';
import {BedrijfService} from './bedrijf/bedrijf.service';
import {BedrijfListComponent} from './bedrijf/bedrijf-list.component';
import {BedrijfComponent} from './bedrijf/bedrijf.component';
import { ErvaringComponent } from './ervaring/ervaring.component';
import {ErvaringService} from './ervaring/ervaring.service';


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        HeaderComponent,
        ErrorComponent,
        UserComponent,
        UsersComponent,
        UserListComponent,
        UserIdentifierComponent,
        FilterPipe,
        PercentagePipe,
        IdentifierComponent,
        UserIdentifierListComponent,
        IdentifiersComponent,
        IdentifierAllComponent,
        SubscriptionComponent,
        SubscriptionsComponent,
        SubscriptionInputComponent,
        SubscriptionListComponent,
        BedrijfInputComponent,
        BedrijfListComponent,
        BedrijfComponent,
        ErvaringComponent

    ],
    imports: [
    BrowserModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
        Ng2FilterPipeModule
    ],
    bootstrap: [AppComponent],
    providers: [
        IdentifierService,
        AuthService,
        ErrorService,
        UserService,
        FilterPipe,
        PercentagePipe,
        SubscriptionService,
        BedrijfService,
        ErvaringService
    ]
})
export class AppModule {

}
