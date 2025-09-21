// `0000_centrales-nucleaires-de-l_IA.png`
// `0001_Montagne-des-gadgets-inutiles.png`
// `0002_gouffre-des-travailleurs-du-clic.png`
// `0003_decharge.png`
// `0004_peage-du-tout-numerique.png`
// `0005_bambous-invasifs.png`
// `0006_brumes-eternelles.png`
// `0007_salons-prives.png`
// `0008_barbeles-des-enclosures.png`
// `0009_arene-validiste.png`
// `0010_usine-à-gaz.png`
// `0011_diligence-de-la-disruption.png`
// `0012_carrefour-des-truands.png`
// `0013_crypto-pigeonnier.png`
// `0014_robots-jardiniers.png`
// `0015_tunnel-technicien.png`
// `0016_nudge-factory.png`
// `0017_tour-en-ruines.png`
// `0018_accords-internationaux.png`
// `0019_cables-transatlantiques.png`
// `0020_marais-des-sombres-desseins.png`


const path = '/assets/images/jouer/objects/';

export const CITIES = [
  {
    src: `${path}0000_centrales-nucleaires-de-l_IA.png`,
    x: 200,
    y: -20,
    depthOffset: 0,
    transformation: {
      src: `${path}0001_moulins-de-la-joie.png`,
      x: 200,
      y: 30,
    }
  },
  {
    src: `${path}0001_Montagne-des-gadgets-inutiles.png`,
    x: 500,
    y: 50,
    depthOffset: 0,
    transformation: {
      src: `${path}0000_colline-des-besoins-reels.png`,
      x: 500,
      y: 100,
    }
  },
  {
    src: `${path}0002_gouffre-des-travailleurs-du-clic.png`,
    x: 470,
    y: 300,
    depthOffset: -50,
    transformation: {
      src: `${path}0002_plancher-social.png`,
      x: 470,
      y: 300,
    }
  },
];