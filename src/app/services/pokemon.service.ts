import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemon:  any = [];
  /**
   *
   * @param {HttpClient} http
   */
  constructor(public http: HttpClient) { }

  async getPokemon() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=145").toPromise();
  }

}
