import {Injectable} from '@angular/core';
import {concatMap, firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "./utils.service";

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

  async getPokemon() { //To Promise invertito in subscribe
    this._httpClient.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100").subscribe({
      next: (result: any,) => {
        this.pokemonApi = result.results
        const pokemonCompleteList = async (): Promise<any> => {
                  await concatMap( //promise all eliminato al suo posto concatMap, studiati anche mergeMap, merge
                    this.pokemonApi.map(async (pokemon: any): Promise<any> => {
                      this.onePokemon = await firstValueFrom(this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`))
                        .catch(err =>
                          this.errormessage = err.message)//Gestisco gli errori
                      this.pokemon.push(this.onePokemon) //Inserisco il singolo pokemon nell'array pokemon
                    })
                  )
                }
        this.isLoading = false;
         pokemonCompleteList()

      },
      error: (err) => { //Gestisco gli errori del subscribe
        console.error(err.message)
        this.errormessage = err.message
      },
      complete: () => {
      }
    })
  }

  //Tolto il search pipe insertia una funzione apposita che filtra sia per nome che per tipo
  async filterList() {
    this.items = this.pokemon;

    const keywords: string = this._utilsService.searchText.trim().toLowerCase();
    const selectType: string = this._utilsService.selectedOption.trim().toLowerCase()

    if (keywords.length > 0 || selectType.length > 0) {
      this.items = this.items.filter((item: any) => item.name.toLowerCase().includes(keywords) && item.types[0].type.name.toLowerCase().includes(selectType))
    }
    return this.items;
  }
}
