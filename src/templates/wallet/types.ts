import BN from "bn.js";
import { JettonWalletContract } from "../../ton/jettons/contracts/JettonWalletContract";
import { JettonTransaction } from "../../ton/jettons/types/JettonTransaction";
// import { Buffer } from "buffer";

export interface LocationParams {
  from: string;
  data: {
    walletInfo: WalletInfo;
    send?: Send;
    jettonAddress?: string;
    pass?: string;
    jettonInfo?: JettonInfo;
  };
}

export interface WalletInfo {
  mnemonic: string;
  encrypted: string;
  public_key: Buffer;
  walletType: string;
  wallet: Wallet;
}

export interface Send {
  jetton?: JettonInfo;
  address: string;
  amount: number;
  message: string;
  status?: string;
}

interface Wallet {
  address: string;
  balance: number;
  seqno?: number;
  transactions?: Transaction[];
  jettons?: JettonInfo[];
}

export interface JettonInfo {
  jetton: Jetton;
  wallet: JettonWalletContract;
  balance: number;
  transactions?: JettonTransaction[];
}

export interface Jetton {
  address: string;
  meta: JettonMeta;
}

interface JettonMeta {
  name?: string;
  symbol: string;
  description?: string;
  image?: string;
}

export interface JettonsData {
  // for localstorage
  [key: string]: JettonMeta;
}

export interface Transaction {
  type: string;
  amount: number | BN;
  address: string;
  msg: string;
  timestamp: number;
}
