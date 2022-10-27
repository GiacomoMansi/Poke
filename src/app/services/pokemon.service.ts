import {Injectable} from '@angular/core';
import { filter, map, mergeAll, mergeMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "./utils.service";

class PokemonSearch {
  results: any
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemonApi: any = []; // Array contenente la chiamata all'api
  public pokemon: any = [];
  public onePokemon: any = [];
  public selectedOption: string = ""
  public errormessage: string = "";
  public isLoading: boolean = true
  public items: any
  constructor(public _httpClient: HttpClient, public _utilsService: UtilsService) {
  }

  /*Mi scuso per non aver capito bene le ultime istruzioni, ahime uso molto le promise, sicuramente mi eserciterò molto
  di più per usare gli observable, grazie mille per i consigli, il ts-ignore purtroppo ho provato a corrgere l'errore che
  mi resituisce webStorm, ho anche cercato su stackOverFlow ma senza riuscire nel risolverlo, ancora grazie di tutto,
  attento una vostra correnzione :) */
  async getPokemon() {
    return this._httpClient.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
      .pipe(filter((data: any) => Boolean(data)),
      map((searchData:PokemonSearch ) => searchData.results),
        // @ts-ignore
      mergeMap(dataResults => {
        return dataResults.map((res: { name: any; }) => {
          return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${res.name}`)
        })
      }),
        mergeAll()
      )
    .subscribe((response: any) => {
       this.onePokemon = response
        this.pokemon.push(this.onePokemon)
    })
  }

  //Tolto il search pipe insertia una funzione apposita che filtra sia per nome che per tipo
   filterList() {
    this.items =  this.pokemon;

    const keywords: string = this._utilsService.searchText.trim().toLowerCase();
    const selectType: string = this._utilsService.selectedOption.trim().toLowerCase()

    if (keywords.length > 0 || selectType.length > 0) {
      this.items = this.items.filter((item: any) => item.name.toLowerCase().includes(keywords) && item.types[0].type.name.toLowerCase().includes(selectType))
    }
    return this.items;
  }
}
