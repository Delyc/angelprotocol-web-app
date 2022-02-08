import { FC } from "react";

export interface Values {
  is_buy: boolean;
  amount: string;
  slippage: "0.5" | "1.0" | "1.5" | "2.0";
  return_amount: string;
  pct_commission: string;
  ratio: number;
}

export type Props = {
  Form: FC;
};