import {Component, Input} from '@angular/core';
import {Identifier} from './identifier.model';
import {IdentifierService} from './identifier.service';

@Component({
    selector: 'app-identifier',
    templateUrl: 'identifier.component.html'
})

export class IdentifierComponent {
    @Input() identifier: Identifier;


    constructor(private identifierService: IdentifierService) {}

    /*Deleting identifier of user*/
    onDelete() {
        const myConfirm = confirm('Wilt u "' + this.identifier.nfcId + '" echt verwijderen?');
        if (myConfirm === false) { return; }
        this.identifierService.deleteIdentifier(this.identifier)
            .subscribe(
              (result: any) => alert(result.title)
            );
    }
}
