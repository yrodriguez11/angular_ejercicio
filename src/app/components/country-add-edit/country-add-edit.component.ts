import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'
import {FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Country } from 'src/app/models/Country.models';

@Component({
  selector: 'app-country-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.css']
})
export class CountryAddEditComponent implements OnInit {
  @Input() country!: Country
           
  close = new EventEmitter<void>();
  formCountry!: FormGroup; // Variable para el formulario
  countries!: Country[];
  flagEdit = false;

  constructor(private _dialog: MatDialog,
              private fb: FormBuilder)
  {     
      this.formCountry = this.fb.group({
                  name: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+$'),
                  ]),
                  capital: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+$'),
                  ]),
                  code: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]{3}$'),
                  ]),
                  urlFlag: new FormControl('', [
                    Validators.required,
                    //Validators.pattern('^(http|https)://([a-zA-Z0-9_.\-]+\.[a-zA-Z]{2,6}|localhost)(:[0-9]{1,5})?(\/[a-zA-Z0-9_.\-~%]*)?$')
                    ]),
                  population: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[0-9]+$'),
                    
                  ]),
                  region: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+$'),
                  ]),
                  subregion: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZÀ-ÿ \u00f1\u00d1]+$'),
                  ]),
              });
}
 
ngOnInit(): void {

      let countryEdit = localStorage.getItem('country');
      this.country = countryEdit ? JSON.parse(countryEdit) : null;
      
      if (this.country) {
          
          this.formCountry.controls['name'].setValue(this.country.name);
          this.formCountry.controls["name"].updateValueAndValidity();
          this.formCountry.controls['capital'].setValue(this.country.capital);
          this.formCountry.controls["capital"].updateValueAndValidity();
          this.formCountry.controls['code'].setValue(this.country.code);
          this.formCountry.controls["code"].updateValueAndValidity();
          this.formCountry.controls['urlFlag'].setValue(this.country.urlFlag);
          this.formCountry.controls["urlFlag"].updateValueAndValidity();
          this.formCountry.controls['population'].setValue(this.country.population);
          this.formCountry.controls["population"].updateValueAndValidity();
          this.formCountry.controls['region'].setValue(this.country.region);
          this.formCountry.controls["region"].updateValueAndValidity();
          this.formCountry.controls['subregion'].setValue(this.country.subregion);
          this.formCountry.controls["subregion"].updateValueAndValidity();
          this.flagEdit = true;
        }
  }
  
  enventCancel(){
    this._dialog.closeAll();
   
  }
  
  async onSave(): Promise<void> {
    
    if (this.formCountry.valid) {
      
      const country : Country = this.formCountry.value;
      
      
      const countriesString = localStorage.getItem('countries');
      this.countries = countriesString ? JSON.parse(countriesString) : [];
        if(!this.flagEdit){ //SAVE 
        this.countries.push(country);
       
        }
        else{ //EDIT
        const countryString = localStorage.getItem('country');
        const countryOld = countryString ? JSON.parse(countryString) : null;
        const editElement = this.countries.find(item => item.name === countryOld.name);
        if (editElement) {
        const indexElement = this.countries.indexOf(editElement);
        this.countries.splice(indexElement, 1, country);}
        }
        
        localStorage.setItem('countries', JSON.stringify(this.countries));
        this._dialog.closeAll();
        window.location.reload();
      
    } else {
      console.log('Formulario no válido');
    }
  }


}
