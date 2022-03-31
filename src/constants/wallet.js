import COINBASE_ICON_URL from 'assets/svgs/coinbase.svg';
import METAMASK_ICON_URL from 'assets/imgs/metamask.png';
import LEDGER_ICON_URL from 'assets/svgs/ledger.svg';
import TREZOR_ICON_URL from 'assets/svgs/trezor.svg';
import LATTICE_ICON_URL from 'assets/svgs/lattice.svg';
import { injected, walletlink, walletconnect, ledger, trezor, lattice, authereum, fortmatic, portis, torus} from '../connectors';
// import {WALLETCONNECT_URL, AUTHEREUM_URL, FORMATIC_URL, PORTIS_URL, TORUS_URL} from './icons.constants'
import Icons from './icons.constants'

export const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    icon: METAMASK_ICON_URL,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    icon: COINBASE_ICON_URL,
  },
  WALLETCONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    icon: Icons.WALLETCONNECT_URL,
  },
  LEDGER: {
    connector: ledger,
    name: 'Ledger',
    icon: LEDGER_ICON_URL,
  },
  LATTICE: {
    connector: lattice,
    name: 'Lattice',
    icon: LATTICE_ICON_URL,
  },
  AUTHEREUM: {
    connector: authereum,
    name: 'Authereum',
    icon: Icons.AUTHEREUM_URL,
  },
  TREZOR: {
    connector: trezor,
    name: 'Trezor',
    icon: TREZOR_ICON_URL,
  },
  FORMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    icon: Icons.FORTMATIC_URL,
  },
  PORTIS: {
    connector: portis,
    name: 'Potis',
    icon: Icons.PORTIS_URL,
  },
  TORUS: {
    connector: torus,
    name: 'Torus',
    icon: Icons.TORUS_URL,
  },
};
