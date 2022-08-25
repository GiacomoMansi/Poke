import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonSearchComponent implements OnInit {


  constructor(public pokemonService: PokemonService, public http: HttpClient,) {
  }

  public pokemonApi: any = []; // Array conentente la chiamata all'api
  public pokemon: any = [];
  public item: any = [];
  public aPokemon: any = [];

  async ngOnInit() {
    this.pokemonApi = await this.pokemonService.getPokemon() //Chiamo il service e inserisco il response nell'array

    const pokemonCompleteList = async (): Promise<any> => {
      await Promise.all(
        this.pokemonApi.results.map(async (pokemon: any): Promise<any> => { //
          this.aPokemon = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).toPromise()
          this.pokemon.push(this.aPokemon)
          //Assegno le statistiche all'oggetto
          Object.assign(this.aPokemon, {hp: this.aPokemon.stats[0].base_stat})
          Object.assign(this.aPokemon, {attack: this.aPokemon.stats[1].base_stat})
          Object.assign(this.aPokemon, {defense: this.aPokemon.stats[2].base_stat})
          Object.assign(this.aPokemon, {specialAttack: this.aPokemon.stats[3].base_stat})
          Object.assign(this.aPokemon, {specialDefense: this.aPokemon.stats[4].base_stat})
          Object.assign(this.aPokemon, {speed: this.aPokemon.stats[5].base_stat})
          //Assegno il tipo di pokemon all'oggetto
          Object.assign(this.aPokemon, {typo: this.aPokemon.types[0].type.name})

        })
      )
    }
    await pokemonCompleteList()
  }

  //Sort by typo and stats
  key = " ";
  reverse: boolean = false;

  sort(key: any) {
    this.key = key
    this.reverse = !this.reverse

  }
}

