import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { baseUrl } from "../index";
import { genQueryPath } from "./genQueryPath";

export async function queryContract<T extends QT>(
  type: T,
  contract: string,
  args: Q[T]["args"],
  url = baseUrl
) {
  return fetch(`
    ${url}/${genQueryPath(type, args, contract)}
  `)
    .then<Q[T]["res"]>((res) => res.json())
    .then((result) => result.data as Q[T]["res"]["data"]);
}