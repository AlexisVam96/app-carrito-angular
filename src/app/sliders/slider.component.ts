import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliders: any[] = [
    { img: 'https://images.ctfassets.net/dfhnfm93fvnr/AyJIMCUgxgrmcSG6c47dY/b9300015e9a48edf2dc0282890c783c0/BIG-BANNER_2400X582_.jpg?q=75&w=1920'
    },
    { img: 'https://images.ctfassets.net/dfhnfm93fvnr/4EHXjNZKn3Nfwt3ZwUdCrJ/64130e06856011ae899279db288c22fe/Banner_Desktop.jpg?q=75&w=1920'
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
    ngbCarouselConfig.interval = 5000;
    ngbCarouselConfig.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

}
