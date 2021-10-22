import { Component, OnInit , Input} from '@angular/core';
import { ItemService} from './item.service'
import {Compra} from '../models/compra'
import { ActivatedRoute} from '@angular/router'
import { ComprasService} from '../services/compras.service'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() compra: Compra

  constructor(public itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      if(id){
        this.comprasService.getCompra(id).subscribe(
          compra => this.compra = compra
        )
      }

    })
  }

}
