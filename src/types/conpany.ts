export interface Irate {
  parcela: string | number;
  taxa: number;
}

export interface IConpany {
  conpany: string;
  rate: Irate[];
  style?: string;
}

export interface InputValue {
  initial: number;
  coin: string;
}
