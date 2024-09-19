import axios from 'axios';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
type GasPrice = {
  suggestedMaxPriorityFeePerGas: string;
  suggestedMaxFeePerGas: string;
  minWaitTimeEstimate: number;
  maxWaitTimeEstimate: number;
};

type GasPricesResponse = {
  low: GasPrice;
  medium: GasPrice;
  high: GasPrice;
  estimatedBaseFee: string;
  networkCongestion: number;
  latestPriorityFeeRange: [string, string];
  historicalPriorityFeeRange: [string, string];
  historicalBaseFeeRange: [string, string];
  priorityFeeTrend: string;
  baseFeeTrend: string;
};

// Load environment variables from .env file
dotenv.config();

async function fetchGasPrices(): Promise<GasPricesResponse> {
  const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ':' + process.env.INFURA_API_KEY_SECRET,
  ).toString('base64');

  // The chain ID of the supported network
  const chainId = 1;

  try {
    const { data } = await axios.get<GasPricesResponse>(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.log('Server responded with:', error);
    throw new Error('Failed to fetch gas prices');
  }
}

export async function GET(req: NextRequest) {
  try {
    const gasPrices = await fetchGasPrices();

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('gas_prices');

    await collection.insertOne({
      ...gasPrices,
      timestamp: new Date(),
    });
    return NextResponse.json({
      message: 'Gas prices saved successfully',
      status: 'success',
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      );
    }
  }
}
