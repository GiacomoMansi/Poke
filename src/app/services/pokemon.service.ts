import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  /**
   *
   * @param {HttpClient} http
   */
  constructor(public http: HttpClient) { }

  async getPokemon() {
    return await firstValueFrom(this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=599"));
  }
}
