import { calculateGasMargin, getHigherGWEI } from 'utils';
import { Contracts } from 'constants/networks';
import useContract from 'hooks/useContract';

import { FACTORY_ABI } from './abi';

export const useFactoryContract = () => {
  const { getContract } = useContract();

  const getFactoryContract = async () =>
    await getContract(Contracts.factory, FACTORY_ABI);

  const getPrivateFactoryContract = async () =>
    await getContract(Contracts.privateFactory, FACTORY_ABI);

  const getArtFactoryContract = async () =>
    await getContract(Contracts.artFactory, FACTORY_ABI);

  const getPrivateArtFactoryContract = async () =>
    await getContract(Contracts.privateArtFactory, FACTORY_ABI);

  const createNFTContract = async (contract, name, symbol, value, from) => {
    const args = [name, symbol];

    const options = {
      value,
      from,
      gasPrice: await getHigherGWEI(),
    };
    const platformFee = await contract.platformFee()
    console.log({platformFee: platformFee.toString(), value:value, gasPrice:options.gasPrice})
    
    const gasEstimate = await contract.estimateGas.createNFTContract(
      // const gasEstimate = await contract.createNFTContract(
      ...args,
      options
    );
    console.log('Gas Estimat is ', gasEstimate);
    options.gasLimit = calculateGasMargin(gasEstimate);
    console.log('Gas Limit is ', options.gasLimit.toString());
    return await contract.createNFTContract(...args, options);
  };

  return {
    getFactoryContract,
    getPrivateFactoryContract,
    getArtFactoryContract,
    getPrivateArtFactoryContract,
    createNFTContract,
  };
};
