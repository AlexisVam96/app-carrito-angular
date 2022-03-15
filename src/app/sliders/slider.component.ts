import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliders: any[] = [
    { img: '/assets/img/dota-banner.png'
    },
    {
      img: '/assets/img/lol-banner.png'
    },
    {
      img: '/assets/img/csgo-banner.png'
    },
    {
      img: '/assets/img/fortnite-banner.png'
    }
  ]

  sliders_cuadrados: any[] = [
    {
      img:'https://images.ctfassets.net/l9x8e72nkkav/W8n1JAtKBjEI5E72YJsVp/daf6ba1dd774262a33b2d41226f76b10/inka-mob-slide-FarmaciaOnline.jpg',
    },
    {
      img: 'https://images.ctfassets.net/l9x8e72nkkav/6sITGh6LREX7MbDiApv6l9/4a33a1d3275b90b134264c0b49e56026/inka-mob-slide-Kativa.jpg'
    }
  ]


  constructor(public ngbCarouselConfig: NgbCarouselConfig) {
    ngbCarouselConfig.interval = 3000;
    ngbCarouselConfig.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

}
