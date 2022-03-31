import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { LatticeConnector } from '@web3-react/lattice-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { MagicConnector } from '@web3-react/magic-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TorusConnector } from '@web3-react/torus-connector'

import { NetworkConnector } from './NetworkConnector';

import ARTION_LOGO_URL from '../assets/svgs/EthereumFoundation.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
console.log('KKKKKKKKKKKKKKKKK', process.env.REACT_APP_ENV)
const POLLING_INTERVAL = 12000
const RPC = isMainnet
  ? {
      [ChainId.MAINNET]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    }
  : {
      [ChainId.ROPSTEN]: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    };

export const network = new NetworkConnector({
  defaultChainId: ChainId.MAINNET,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
        1, // Ethereum main network
      ]
    : [
        3, // Ropsten testnet
      ],
});

export const walletlink = new WalletLinkConnector({
  url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  appName: 'Central World',
  appLogoUrl: ARTION_LOGO_URL,
});

export const walletconnect = new WalletConnectConnector({
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
  infuraId: process.env.REACT_APP_INFURA_ID,
  rpc: { 1: RPC },
  chainId: 1,
  supportedChainIds: [1],
})

export const ledger = new LedgerConnector({
  chainId: 1,
  url: RPC,
  pollingInterval: POLLING_INTERVAL,
})

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC,
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'dummy@abc.xyz',
  manifestAppUrl: 'http://localhost:3000',
})

export const lattice = new LatticeConnector({
  chainId: 1,
  appName: 'NFT-marketplace',
  url: RPC,
})

export const frame = new FrameConnector({ supportedChainIds: [1] })

export const authereum = new AuthereumConnector({ chainId: 42 })

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_API_KEY,
  chainId: 1,
})

export const magic = new MagicConnector({
  apiKey: process.env.REACT_APP_MAGIC_API_KEY,
  chainId: 1,
  email: 'hello@example.org',
})

export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID,
  networks: [1, 100],
})

export const torus = new TorusConnector({ chainId: 1 })
