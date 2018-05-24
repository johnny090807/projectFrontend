import {Component, Input, OnInit} from '@angular/core';
import {Bedrijf} from './bedrijf.model';
import {BedrijfService} from './bedrijf.service';
import {AuthService} from '../auth/auth.service';
import {ErvaringService} from "../ervaring/ervaring.service";

@Component({
  selector: 'app-bedrijf',
  templateUrl: './bedrijf.component.html',
  styleUrls: ['./bedrijf.component.css']
})
export class BedrijfComponent {
  @Input() bedrijf: Bedrijf;
  public ervaringen = [];
  public Editmode = false;
  constructor(private bedrijfService: BedrijfService,
              public authService: AuthService,
              private ervaringService: ErvaringService) { }

      checkErvaringen(ervaringen: any){
      this.ervaringen = [];
          for ( const ervaring of ervaringen)
          {
              this.ervaringService.getErvaringById(ervaring)
                  .subscribe(
                      (data:any) => {
                          this.ervaringen.push(data.obj)
                          console.log(this.ervaringen)
                      }
                  )
          }
      }
    onDelete() {
        const myConfirm = confirm('Wilt u "' + this.bedrijf.naam + '" echt verwijderen?');
        if (myConfirm === false) { return; }
        this.bedrijfService.deleteBedrijf(this.bedrijf)
            .subscribe(
                (result: any) => alert(result.title)
            );
    }
    onEdit(){
    this.Editmode = !this.Editmode;
    }
    EditConfirm() {
        this.bedrijfService.patchBedrijf(this.bedrijf)
            .subscribe(
                result =>  console.log(result)
            );
    }

}
