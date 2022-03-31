import { ChainId } from '@sushiswap/sdk';

// import iconFTM from 'assets/imgs/ftm.png';
import iconETH from 'assets/svgs/Ethereum_small.svg';
import iconWETH from 'assets/imgs/wftm.png';
import iconUSDT from 'assets/imgs/usdt.png';
import iconUSDC from 'assets/imgs/usdc.png';
import iconDAI from 'assets/imgs/dai.png';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const Tokens = {
  [ChainId.MAINNET]: [

    {
      address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      icon: iconWETH,
    },
    {
      address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      name: 'Tether USD',
      symbol: 'fUSDT',
      decimals: 6,
      icon: iconUSDT,
    },
    {
      address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      icon: iconUSDC,
    },
    {
      address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      icon: iconDAI,
    },
  ],
  [ChainId.ROPSTEN]: [
    
    {
      address: '0xac7fa82f7b2937b0714a61c84fa9902224ad5a65',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: iconETH,
    },
    {
      address: '0xc778417e063141139fce010982780140aa0cd5ab',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      icon: iconWETH,
    }
  ],
};

export default function useTokens() {
  const chain = isMainnet ? ChainId.MAINNET : ChainId.ROPSTEN;

  const tokens = Tokens[chain];

  const getTokenByAddress = addr => {
    const address =
      !addr ||
      addr === '0x0000000000000000000000000000000000000000' ||
      addr === 'ftm'
        ? ''
        : addr;
    return (tokens || []).find(
      tk => tk.address.toLowerCase() === address.toLowerCase()
    );
  };

  return { getTokenByAddress, tokens };
}
