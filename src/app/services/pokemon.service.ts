import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

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

  constructor(public _httpClient: HttpClient) {
  }

  async getPokemon() { //To Promise invertito in subscribe
    this._httpClient.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500").subscribe({
      next: (result: any,) => {
        this.pokemonApi = result.results
        const pokemonCompleteList = async (): Promise<any> => {
          await Promise.all(
            this.pokemonApi.map(async (pokemon: any): Promise<any> => {
              this.onePokemon = await firstValueFrom(this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`))
                .catch(err =>
                  this.errormessage = err.message)//Gestisco gli errori
              this.pokemon.push(this.onePokemon) //Inserisco il singolo pokemon nell'array pokemon

              //Assegno le statistiche all'oggetto onePokemon eliminati gli object assign
              this.onePokemon = {
                hp: this.onePokemon.stats[0].base_stat,
                attack: this.onePokemon.stats[1].base_stat,
                defense: this.onePokemon.stats[2].base_stat,
                specialAttack: this.onePokemon.stats[3].base_stat,
                specialDefense: this.onePokemon.stats[4].base_stat,
                speed: this.onePokemon.stats[5].base_stat,
                typo: this.onePokemon.types[0].type.name,
              }
              /*Object.assign(this.onePokemon, {hp: this.onePokemon.stats[0].base_stat})
              Object.assign(this.onePokemon, {attack: this.onePokemon.stats[1].base_stat})
              Object.assign(this.onePokemon, {defense: this.onePokemon.stats[2].base_stat})
              Object.assign(this.onePokemon, {specialAttack: this.onePokemon.stats[3].base_stat})
              Object.assign(this.onePokemon, {specialDefense: this.onePokemon.stats[4].base_stat})
              Object.assign(this.onePokemon, {speed: this.onePokemon.stats[5].base_stat})
              //Assegno il tipo di pokemon all'oggetto onePokemon
              Object.assign(this.onePokemon, {typo: this.onePokemon.types[0].type.name})*/
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
}
