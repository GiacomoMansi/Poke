import {Component, Input, OnInit} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";
import { items } from "../pokemon-cards/pokemon-cards.component"

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() items: any; //riceve un oggetto dal padre che è esposto nel componente lista pokemon


  constructor(public _pokemonService: PokemonService, public http: HttpClient) { }

 async ngOnInit() {
    console.log(this.items)
 }
}
