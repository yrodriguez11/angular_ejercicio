import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryAddEditComponent } from '../country-add-edit/country-add-edit.component';
import { Country } from 'src/app/models/Country.models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  
  constructor( private _dialog: MatDialog){}

  openAddEditCountryForm(){ // AGREGAR PAIS
    localStorage.removeItem('country'); 
    this._dialog.open(CountryAddEditComponent);
}
  updateAllData(){
localStorage.removeItem('countries');
localStorage.removeItem('country');  
window.location.reload();    
}
}
