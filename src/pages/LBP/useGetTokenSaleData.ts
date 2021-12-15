import { useState, useEffect } from "react";
import {
  LBPPairDataQueryResult,
  PairData,
  useGetLBPPairDataQuery,
} from "services/aws/lbp";

export interface PriceData {
  price: number;
  timestamp: number;
}

export interface LBPPairData {
  tokenName: string;
  auctionStartDateTime: number;
  auctionEndDateTime: number;
  historicPriceData: PriceData[];
  predictedPriceData: PriceData[];
}

// TODO: If the prediction price line is necessary, this should be read from the DB
const DAY_IN_MILISECONDS = 24 * 36e5;

export function useGetLBPPairData() {
  const { data, isLoading, isFetching } = useGetLBPPairDataQuery(null);

  const [error, setError] = useState("");
  const [lbpPairData, setLBPPairData] = useState({
    tokenName: "HALO",
    historicPriceData: [],
    predictedPriceData: [],
    auctionStartDateTime: Date.now() - DAY_IN_MILISECONDS,
    auctionEndDateTime: Date.now() + DAY_IN_MILISECONDS,
  } as LBPPairData);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.error) {
      setError(
        `Failed to get LBP pair data. Error message: ${data.error.message}`
      );
      return;
    }

    const historicPriceData = getHistoricPriceData(data);
    const predictedPriceData = getPredictedPriceData(data);

    const newLBPPairData = {
      tokenName: "HALO",
      auctionStartDateTime: data.lbp_start_time * 1000,
      auctionEndDateTime: data.lbp_end_time * 1000,
      historicPriceData,
      predictedPriceData,
    };
    setLBPPairData(newLBPPairData);
  }, [data]);

  return {
    error: !isLoading && error,
    isLoading: isLoading || isFetching,
    lbpPairData,
  };
}

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPricePoints = (startDateTime: number, endDateTime: number) =>
  Math.abs(endDateTime - startDateTime) / 36e5;

const calculateTokenPrice = (pairData: PairData) =>
  pairData.offer_amount / pairData.return_amount;

const getHistoricPriceData = (data: LBPPairDataQueryResult): PriceData[] =>
  data.items.map((pairData) => ({
    price: calculateTokenPrice(pairData),
    timestamp: pairData.timestamp,
  }));

const getPredictedPriceData = (data: LBPPairDataQueryResult): PriceData[] => {
  if (!data || !data.target_price || !data.items || data.items.length === 0) {
    return [];
  }

  const target: PriceData = {
    price: data.target_price,
    timestamp: data.lbp_end_time,
  };

  const lastPairDataPoint = data.items[data.items.length - 1];
  const lastPrice = calculateTokenPrice(lastPairDataPoint);
  const lastDate = lastPairDataPoint.timestamp;
  const numberOfPricePoints = getNumberOfPricePoints(
    lastDate,
    target.timestamp
  );

  // we initialize predicted points with the last pair data point
  const points: PriceData[] = [
    {
      price: lastPrice,
      timestamp: lastDate,
    },
  ];

  const getPriceOnPoint = (i: number) =>
    (Math.abs(lastPrice - target.price) / numberOfPricePoints) *
      (numberOfPricePoints - i) +
    target.price;

  const getDateOnPoint = (i: number) =>
    (Math.abs(lastDate - target.timestamp) / numberOfPricePoints) * i +
    lastDate;

  for (let i = 1; i < numberOfPricePoints; i++) {
    points.push({
      price: getPriceOnPoint(i),
      timestamp: getDateOnPoint(i),
    });
  }

  points.push(target);

  return points;
};