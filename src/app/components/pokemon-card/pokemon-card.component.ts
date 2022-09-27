import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() items: any; //riceve un oggetto dal padre che è esposto nel componente lista pokemon
  @Input() config: any;

  constructor(public _pokemonService: PokemonService, public http: HttpClient, public _utilsService: UtilsService) { }

 async ngOnInit() {
    console.log(this.items)
 }
}
