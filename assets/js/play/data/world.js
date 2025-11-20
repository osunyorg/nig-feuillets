import settings from "./settings";

const forest1 = '/assets/images/jouer/elements/forest01.png',
  forest2 = '/assets/images/jouer/elements/forest02.png',
  rocks1 = '/assets/images/jouer/elements/rocks01.png',
  rocks2 = '/assets/images/jouer/elements/rocks02.png';

export const WORLD = {
  width: 2692 / 2,
  height: 3231 / 2,
  mapSrc: '/assets/images/jouer/layers/map.png',
  // mapSrc: '/assets/images/jouer/layers/map-filled.png', // use to debug placment
  animateIntroduction: true,
  hero: {
    x: 500,
    y: 450
  },
  characters: {
    scale: 0.25
  },
  cities: {
    scale: 1
  },
  elements: [
    // {
    //   src: forest2,
    //   width: 130,
    //   height: 110,
    //   x: 200,
    //   y: 440,
    //   depthOffset: 0
    // },
  ],
  collisions: {
    size: 160,
    visible: false,
    matrice: [
      '00000000',
      '01111100',
      '01111100',
      '01111100',
      '01111100',
      '01111110',
      '011111110',
      '011111110',
      '011111110',
      '00000000'
    ]
  }
}