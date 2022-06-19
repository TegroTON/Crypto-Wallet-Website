import { Navigate } from "react-router-dom";
import {
  Address,
  Cell,
  CommentMessage,
  toNano,
  Wallet,
  WalletV1R2Source,
  WalletV1R3Source,
  WalletV2R1Source,
  WalletV2R2Source,
  WalletV3R1Source,
  WalletV3R2Source,
} from "ton";
import { mnemonicNew, mnemonicToWalletKey } from "ton-crypto";
import { decrypt, encrypt } from "./crypto";
import BN from "bn.js";
import { JettonsData, Send, Transaction } from "../templates/wallet/types";
import { Buffer } from "buffer";
import { client } from "./index";
import { JettonMasterContract } from "./jettons/contracts/JettonMasterContract";
import { Jetton } from "../templates/wallet/types";
import { IPFS_GATEWAY_PREFIX } from "./jettons/utils/ipfs";

export async function openWalletByPublicKey(publicKey: Buffer, type: string) {
  if (type === "org.ton.wallets.simple") {
    throw Error("Unsupported wallet");
  } else if (type === "org.ton.wallets.simple.r2") {
    return client.openWalletFromCustomContract(
      WalletV1R2Source.create({ publicKey: publicKey, workchain: 0 })
    );
  } else if (type === "org.ton.wallets.simple.r3") {
    return client.openWalletFromCustomContract(
      WalletV1R3Source.create({ publicKey: publicKey, workchain: 0 })
    );
  } else if (type === "org.ton.wallets.v2") {
    return client.openWalletFromCustomContract(
      WalletV2R1Source.create({ publicKey: publicKey, workchain: 0 })
    );
  } else if (type === "org.ton.wallets.v2.r2") {
    return client.openWalletFromCustomContract(
      WalletV2R2Source.create({ publicKey: publicKey, workchain: 0 })
    );
  } else if (type === "org.ton.wallets.v3") {
    return client.openWalletFromCustomContract(
      WalletV3R1Source.create({ publicKey: publicKey, workchain: 0 })
    );
  } else if (type === "org.ton.wallets.v3.r2") {
    return client.openWalletFromCustomContract(
      WalletV3R2Source.create({ publicKey: publicKey, workchain: 0 })
    );
  } else {
    throw Error("Unknown wallet type: " + type);
  }
}

export function walletTypeNorm(walletType: string) {
  if (walletType === "v1r2") return "org.ton.wallets.simple.r2";
  else if (walletType === "v1r3") return "org.ton.wallets.simple.r3";
  else if (walletType === "v2") return "org.ton.wallets.v2";
  else if (walletType === "v2r2") return "org.ton.wallets.v2.r2";
  else if (walletType === "v3") return "org.ton.wallets.v3";
  else if (walletType === "v3r2") return "org.ton.wallets.v3.r2";
  else throw Error("Unknown wallet type: " + walletType);
}

export function UnloginOnly({ children }: any) {
  const auth = localStorage.getItem("address") != null;
  if (auth) return <Navigate to="/wallet" />;
  return children;
}

export function LoginOnly({ children }: any) {
  const auth = localStorage.getItem("address") != null;

  if (!auth) {
    return <Navigate to="/wallet" />;
  }
  return children;
}

export async function getMnemonic(
  password?: string
): Promise<[string, string]> {
  const old_mnemonic = localStorage.getItem("mnemonic");
  const old_encrypted = localStorage.getItem("encrypted");
  if (old_mnemonic) {
    if (old_encrypted === "false") {
      const old_words = old_mnemonic.split(" ");
      if (old_words.length == 24) return [old_mnemonic, old_encrypted];
    } else {
      if (password) return [await decrypt(old_mnemonic, password), "true"];
      return [old_mnemonic, "true"];
    }
  }
  const new_words = await mnemonicNew();
  const new_mnemonic = new_words.join(" ");
  localStorage.setItem("mnemonic", new_mnemonic);
  localStorage.setItem("encrypted", "false");
  return [new_mnemonic, "false"];
}

export function setMnemonic(words: string[]) {
  localStorage.setItem("mnemonic", words.join(" "));
  localStorage.setItem("encrypted", "false");
}

export async function createWallet(password: string): Promise<boolean> {
  const [mnemonic] = await getMnemonic();
  const words = mnemonic.split(" ");
  const key = await mnemonicToWalletKey(words);
  // const wallet = await client.findWalletFromSecretKey({ workchain: 0, secretKey: key.secretKey })
  const wallet = await client.openWalletFromSecretKey({
    workchain: 0,
    secretKey: key.secretKey,
    type: "org.ton.wallets.v3.r2",
  });
  localStorage.setItem("public_key", key.publicKey.toString("hex"));
  localStorage.setItem("mnemonic", await encrypt(words.join(" "), password));
  localStorage.setItem("encrypted", "true");
  localStorage.setItem("address", wallet.address.toFriendly());
  return true;
}

export async function getWallet(password: string): Promise<Wallet> {
  const [mnemonic] = await getMnemonic(password);
  const words = mnemonic.split(" ");
  const key = await mnemonicToWalletKey(words);
  // TODO сделать выбор версии контракта
  return client.openWalletFromSecretKey({
    workchain: 0,
    secretKey: key.secretKey,
    type: "org.ton.wallets.v3.r2",
  });
}

export async function getBalance(address: string): Promise<BN> {
  if (!address) return new BN(0);
  const balance = await client.getBalance(Address.parse(address));
  console.log(address, balance);
  return balance || new BN(0);
}

export async function getTransactions(
  address: string,
  limit: number = 5
): Promise<Transaction[] | undefined> {
  if (!address) return undefined;
  const trans = await client.getTransactions(Address.parse(address), {
    limit: limit,
  });
  return trans.map((tr) => {
    const type = tr.inMessage?.source === null ? "external" : "internal";
    const amount =
      type === "external" ? tr.outMessages[0].value : tr.inMessage?.value;
    const addr =
      type === "external"
        ? tr.outMessages[0].destination
        : tr.inMessage?.source;
    const msg =
      type === "external"
        ? tr.outMessages[0].body?.type === "text"
          ? tr.outMessages[0].body.text
          : null
        : tr.inMessage?.body?.type === "text"
        ? tr.inMessage?.body.text
        : null;
    const timestamp = tr.time;
    return {
      type: type,
      amount: amount,
      address: addr?.toFriendly(),
      msg: msg,
      timestamp: timestamp,
    } as Transaction;
  });
}

export function checkAddrValid(address: string) {
  try {
    Address.parse(address);
    return true;
  } catch {
    return false;
  }
}

export async function getAddress(walletType: string = "v3r2") {
  const pub_key = getPubKey();
  const wallet = await openWalletByPublicKey(
    pub_key,
    walletTypeNorm(walletType)
  );
  return wallet.address.toFriendly();
}

export function getPubKey() {
  const pubKey = localStorage.getItem("public_key");
  if (pubKey) return Buffer.from(pubKey, "hex");
  else return Buffer.from("0", "hex");
}

export function getWalletType() {
  const walletType = localStorage.getItem("wallet_type");
  if (walletType) return walletType;
  else return setWalletType();
}

export function setWalletType(walletType: string = "v3r2") {
  localStorage.setItem("wallet_type", walletType);
  return walletType;
}

export async function checkPassValid(password: string) {
  const mnemonic = localStorage.getItem("mnemonic") || "";
  try {
    await decrypt(mnemonic, password);
    return true;
  } catch {
    return false;
  }
}

async function getSecretKey(password: string) {
  const mnemonic = await decrypt(
    localStorage.getItem("mnemonic") || "",
    password
  );
  const words = mnemonic.split(" ");
  const key = await mnemonicToWalletKey(words);

  return key.secretKey;
}

export async function sendTransaction(tr_info: Send, password: string) {
  const wallet = await getWallet(password);
  const secretKey = await getSecretKey(password);
  const seqNo = await wallet.getSeqNo();
  const recipientAddress = Address.parse(tr_info.address);
  const bounce = await client.isContractDeployed(recipientAddress);

  for (let i = 0; i < 3; i++) {
    if (tr_info.jetton) {
      const to = tr_info.jetton.wallet.address;
      let forwardPayload = new Cell();
      new CommentMessage(tr_info.message).writeTo(forwardPayload);

      const payload = tr_info.jetton.wallet.createTransferRequest({
        queryId: Date.now() / 1000,
        forwardPayload: tr_info.message.length > 0 ? forwardPayload : null,
        responseDestination: wallet.address,
        forwardAmount: 0,
        amount: toNano(tr_info.amount),
        destination: recipientAddress,
      });
      await wallet.transfer({
        seqno: seqNo,
        to: to,
        secretKey: secretKey,
        value: new BN(35000000, 10),
        bounce: bounce,
        payload: payload,
      });
    } else {
      await wallet.transfer({
        seqno: seqNo,
        to: recipientAddress,
        secretKey: secretKey,
        value: toNano(tr_info.amount),
        bounce: bounce,
        payload: tr_info.message,
      });
    }
  }
}

export function clearStorage() {
  localStorage.clear();
}

export async function getSeqno(address: string): Promise<number> {
  const addr = Address.parse(address) as Address;
  const wallet = await client.openWalletFromAddress({ source: addr });
  return await wallet.getSeqNo();
}

export async function checkSeqnoUpdate(
  seqno: number,
  walletType: string = "v3r2"
) {
  return (await getSeqno(await getAddress(walletType))) > seqno;
}

export async function testJetton() {
  const jetton_master_addr = "EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y";
  const contract = new JettonMasterContract(
    client,
    null as any,
    Address.parse(jetton_master_addr)
  );
  const { content } = await contract.getJettonData();
  const jetton_wallet = await contract.getJettonWallet(
    Address.parse(await getAddress())
  );
  const { balance } = await jetton_wallet.getData();
  console.log(
    "JETTON WALLET",
    jetton_wallet.address.toFriendly(),
    "BALANCE",
    balance.toString()
  );
  console.log("transactions", await jetton_wallet.getTransactions());
  fetch(content.toString())
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export async function checkJettonValid(jettonAddress: string) {
  if (!checkAddrValid(jettonAddress)) return false;
  try {
    const contract = new JettonMasterContract(
      client,
      null as any,
      Address.parse(jettonAddress)
    );
    const jetton_wallet = await contract.getJettonWallet(
      Address.parse(await getAddress())
    );
    return true;
  } catch {
    return false;
  }
}

export async function getJettonData(jettonAddress: string) {
  const contract = new JettonMasterContract(
    client,
    null as any,
    Address.parse(jettonAddress)
  );
  const { content } = await contract.getJettonData();
  return fetch(content.toString().replace(/^ipfs:\/\//, IPFS_GATEWAY_PREFIX))
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function getJettonsData(): JettonsData {
  const data = localStorage.getItem("jettons") || "{}";
  return JSON.parse(data);
}

function setJettonsData(jettonsData: JettonsData) {
  localStorage.setItem("jettons", JSON.stringify(jettonsData));
}

export async function addJetton(jettonAddress: string) {
  const jettonsData = getJettonsData();
  let jettonData = await getJettonData(jettonAddress);

  if (!(jettonAddress in jettonsData)) {
    jettonsData[jettonAddress] = {
      name: jettonData.name || "",
      symbol: jettonData.symbol,
      description: jettonData.description || "",
      image: jettonData.image || "",
    };
    setJettonsData(jettonsData);
  }
}

export function removeJetton(jettonAddress: string) {
  const jettonsData = getJettonsData();
  if (jettonAddress in jettonsData) {
    delete jettonsData[jettonAddress];
    setJettonsData(jettonsData);
  }
}

export async function loadJettons(address: string) {
  await addJetton("EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y");
  let jettons = [];
  const jettonsData = getJettonsData();

  for (const jettonAddress of Object.keys(jettonsData)) {
    const contract = new JettonMasterContract(
      client,
      null as any,
      Address.parse(jettonAddress)
    );
    const jetton_wallet = await contract.getJettonWallet(
      Address.parse(address)
    );
    const { balance } = await jetton_wallet.getData();
    jettons.push({
      jetton: {
        address: jettonAddress,
        meta: jettonsData[jettonAddress],
      } as Jetton,
      wallet: jetton_wallet,
      balance: balance.toNumber() / 10 ** 9,
      transactions: await jetton_wallet.getTransactions(),
    });
  }
  return jettons;
}
