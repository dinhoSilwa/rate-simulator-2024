import { IConpany, Irate } from "../types/conpany";

export const mercadopagorate: Irate[] = [
  { parcela: "Debito", taxa: 1.99 },
  { parcela: 1, taxa: 2.99 },
  { parcela: 2, taxa: 3.49 },
  { parcela: 3, taxa: 4.79 },
  { parcela: 5, taxa: 5.29 },
  { parcela: 6, taxa: 6.29 },
  { parcela: 7, taxa: 7.29 },
  { parcela: 8, taxa: 8.29 },
  { parcela: 9, taxa: 9.29 },
  { parcela: 10, taxa: 10.29 },
  { parcela: 11, taxa: 11.29 },
  { parcela: 12, taxa: 12.29 },
];

export const vermelhinhaRate: Irate[] = [
  { parcela: "Debito", taxa: 2.99 },
  { parcela: 1, taxa: 3.99 },
  { parcela: 2, taxa: 4.49 },
  { parcela: 3, taxa: 5.79 },
  { parcela: 5, taxa: 6.29 },
  { parcela: 6, taxa: 7.29 },
  { parcela: 7, taxa: 8.29 },
  { parcela: 8, taxa: 9.29 },
  { parcela: 9, taxa: 10.29 },
  { parcela: 10, taxa: 11.29 },
  { parcela: 11, taxa: 12.29 },
  { parcela: 12, taxa: 13.29 },
];

export const amarelinhaRate: Irate[] = [
  { parcela: "Debito", taxa: 3.99 },
  { parcela: 1, taxa: 4.59 },
  { parcela: 2, taxa: 5.29 },
  { parcela: 3, taxa: 6.39 },
  { parcela: 5, taxa: 7.69 },
  { parcela: 6, taxa: 8.19 },
  { parcela: 7, taxa: 9.39 },
  { parcela: 8, taxa: 10.09 },
  { parcela: 9, taxa: 11.89 },
  { parcela: 10, taxa: 12.19 },
  { parcela: 11, taxa: 13.59 },
  { parcela: 12, taxa: 14.39 },
];

export const verdinhaRate: Irate[] = [
  { parcela: "Debito", taxa: 5.99 },
  { parcela: 1, taxa: 6.79 },
  { parcela: 2, taxa: 7.69 },
  { parcela: 3, taxa: 8.29 },
  { parcela: 5, taxa: 9.29 },
  { parcela: 6, taxa: 10.99 },
  { parcela: 7, taxa: 11.19 },
  { parcela: 8, taxa: 12.39 },
  { parcela: 9, taxa: 13.79 },
  { parcela: 10, taxa: 14.29 },
  { parcela: 11, taxa: 15.69 },
  { parcela: 12, taxa: 16.29 },
];

export const currentRate: IConpany[] = [
  {
    conpany: "Mercado Pago",
    rate: mercadopagorate,
    style: "hover:bg-blue-300 hover:text-blue-800",
  },
  {
    conpany: "Verdinha",
    rate: verdinhaRate,
    style: "hover:bg-green-300 hover:text-green-800",
  },
  {
    conpany: "Amarelinha",
    rate: amarelinhaRate,
    style: "hover:bg-yellow-300 hover:text-yellow-800",
  },
  {
    conpany: "vermelhinha",
    rate: vermelhinhaRate,
    style: "hover:bg-red-300 hover:text-red-800",
  },
];