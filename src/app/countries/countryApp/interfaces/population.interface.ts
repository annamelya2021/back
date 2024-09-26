export interface PopulationData {
  region: string;
  year: number;
  population: number;
}

export interface ApiPopulationResponse {
  Nombre: string;
  Data: { Anyo: number; Valor: number }[];
}

export interface Province {
  name: string;
  population: number;
}

export interface Community {
  name: string;
  provinces: Province[];
  showProvinces: boolean;
}

