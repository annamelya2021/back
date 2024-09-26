import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Country } from '../../countryApp/interfaces/country.interface';

@Component({
    selector: 'counries-table',
    templateUrl: './countryTable.component.html',
    styles:`
    img{
      width:25px
    }
    `

})
export class CountryTableComponent {
@Input()
public countries:Country[]=[]


}
