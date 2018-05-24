import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Identifier} from './identifier.model';
import {NgForm} from '@angular/forms';
import {User} from '../user/user.model';
import {IdentifierService} from './identifier.service';
import {UserService} from '../user/user.service';

@Component({
    selector: 'app-user-identifier',
    templateUrl: './user-identifier.component.html'
})
export class UserIdentifierComponent implements OnInit {
    public userId: string;
    @Input() identifier: Identifier;
    private sub: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private identifierService: IdentifierService) {}
    onSubmit(form: NgForm) {
            const identifier = new Identifier(form.value.nfcId, this.userId);
            this.identifierService.addUserIdentifier(identifier)
                .subscribe(
                  (data: any) => alert('Kaart ' + data.obj.nfcId + ' toegevoegd.'),
                    error => alert(error.title)
                );
            form.resetForm();
    }
    ngOnInit() {
        this.identifierService.identifierIsEdit.subscribe(
            (identifier: Identifier) => this.identifier = identifier
        );
        this.sub = this.route.params
            .subscribe(
                (params: Params) => {
                    this.userId = params['userId'];
                }
            );
    }
}
