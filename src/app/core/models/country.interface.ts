export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string; // The 3-letter country code we'll use for lookups
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  tld: string[]; // Top Level Domain
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: string[]; // An array of 3-letter country codes
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}