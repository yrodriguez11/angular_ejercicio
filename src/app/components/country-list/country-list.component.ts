import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/models/Country.models';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CountryService } from 'src/app//services/country.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CountryAddEditComponent } from '../country-add-edit/country-add-edit.component';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit{
  
  displayedColumns: string[] = [
          'name',
          'capital',
          'code',
          'urlFlag',
          'population', 
          'region',
          'subregion',
          'accion'];
  dataSource!: MatTableDataSource<Country>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  countriesApi: any = [];
  countries: Country[] = [];
  
  @Output() country = new EventEmitter<Country>();
  
  constructor(
              private countryService: CountryService,
              private _dialog: MatDialog
              ){}
  
   ngOnInit(): void{    

    // if(localStorage.getItem('countries') === null){
      this.getCountriesList();
 // }else{
      
   //   const countriesString = localStorage.getItem('countries');
    //  this.countries = countriesString ? JSON.parse(countriesString) : [];
    // this.dataSource = new MatTableDataSource<Country>(this.countries);
    // this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    //}
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async getCountriesList() {

    (await this.countryService.getCountries()).subscribe((countries) => {
      if (!countries.error) {
        this.countriesApi = countries;
        this.countriesApi.forEach((element: any) => {
              let auxCapital: string[] = element.capital;
              let capital = '-';

              if(auxCapital != undefined){
                capital = auxCapital.find((e, index) => index === 0) as string;
              }
              let country = new Country(element.name.common,
                                        capital,
                                        element.cca3,
                                        element.flags.png,
                                        Number(element.population),
                                        element.region,
                                        element.subregion);
              this.countries.push(country);
            });
      
      if(localStorage.getItem('countries') === null){
        localStorage.setItem('countries', JSON.stringify(this.countries));
        const countriesString = localStorage.getItem('countries');
        this.countries = countriesString ? JSON.parse(countriesString) : [];
      }else{
        const countriesString = localStorage.getItem('countries');
        this.countries = countriesString ? JSON.parse(countriesString) : [];
        //this.countries = new BehaviorSubject<Country[]>(this.countries).getValue();
      //  console.log(this.countries);
      }
      
      this.dataSource = new MatTableDataSource<Country>(this.countries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       
      } else {
        console.log(countries.error);
      }
    }); 
  }

  deleteCountry(name:string) { 

    if(confirm("¿Estas Seguro de eliminar el item?")){

  const deleteElement = this.countries.find(item => item.name === name);
    if (deleteElement) {
      const indexElement = this.countries.indexOf(deleteElement);
      this.countries.splice(indexElement, 1);
      localStorage.setItem('countries', JSON.stringify(this.countries));
      
     // this.countries = new BehaviorSubject<Country[]>(this.countries).getValue();
      this.dataSource = new MatTableDataSource<Country>(this.countries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    }
  }
}


openAddEditCountryForm(country : Country){
  localStorage.setItem('country', JSON.stringify(country));
  //this.country.emit(country);
  this._dialog.open(CountryAddEditComponent);
}

 
}

