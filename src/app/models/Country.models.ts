export class Country{
    name: string;
    capital: string;
    code: string; // codigo pais.
    urlFlag: string;
    population : number;
    region : string;
    subregion : string; 

    constructor(name:string, capital:string, code: string, urlFlag:string, population : number, region: string , subregion: string){
        this.name= name;
        this.capital = capital;
        this.code = code;
        this.urlFlag = urlFlag;
        this.population = population;
        this.region = region;
        this.subregion = subregion;
    }
}