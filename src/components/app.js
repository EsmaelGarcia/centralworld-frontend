import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {ethers} from 'ethers'
import {useWeb3React} from '@web3-react/core'
import {ChainId} from '@sushiswap/sdk'
// import { Client } from '@bandprotocol/bandchain.js';
// import { getHigherGWEI } from 'utils';
import ProtectedRoute from './ProtectedRoute'
import AccountModal from './AccountModal'
import WFTMModal from './WFTMModal'
import NotFound from './NotFound'
import PaintBoard from './PaintBoard'
import LandingPage from '../pages/landingpage'
import ExplorePage from '../pages/explorepage'
import AccountDetails from '../pages/AccountDetails'
import NFTItem from '../pages/NFTItem'
import CollectionCreate from '../pages/Collection/Create'
import CollectionReview from '../pages/Collection/Review'
import NotificationSetting from '../pages/NotificationSetting'
import PriceActions from 'actions/price.actions'


const oracleAddresses = {
  [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_ORACLE,
  // [ChainId.ROPSTEN]: '0x83F00b902cbf06E316C95F51cbEeD9D2572a349a',
  [ChainId.ROPSTEN]: '0x86b685c47cEA86DcD97b2c38470c1Be5e990471b',
}

const App = () => {
  const dispatch = useDispatch()
  const {chainId} = useWeb3React()
  const [priceInterval, setPriceInterval] = useState(null)
  
  const getPrice = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      
      const oracle = new ethers.Contract(oracleAddresses[chainId],
        [{inputs: [], name: 'latestAnswer', outputs: [{internalType: 'int256', name: '', type: 'int256'}], stateMutability: 'view', type: 'function',},],
        provider)
        console.log('Oracle is ', oracle);   
      const _price = await oracle.latestAnswer()
        console.log('Price is ', _price); 
      const price = parseFloat(_price.toString()) / 10 ** 8
      
      dispatch(PriceActions.updatePrice(price))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (priceInterval) {
      clearInterval(priceInterval)
    }

    getPrice()
    setPriceInterval(setInterval(getPrice, 1000 * 10))
  }, [chainId])

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/explore" component={ExplorePage}/>
          <Route path="/explore/:addr/:id" component={NFTItem}/>
          <ProtectedRoute exact path="/create" component={PaintBoard}/>
          {/* <Route path="/bundle/:bundleID" component={NFTItem} /> */}
          <Route path="/account/:uid" component={AccountDetails} />
          {<ProtectedRoute
            path="/collection/create"
            component={() => <CollectionCreate isRegister={false} />}
          />}
          <ProtectedRoute
            path="/collection/register"
            component={() => <CollectionCreate isRegister/>}
          />
          <ProtectedRoute
            path="/collection/review"
            component={CollectionReview}
          />
          <ProtectedRoute
            path="/settings/notification"
            component={NotificationSetting}
          />
          <Route path="/404" component={NotFound}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>
        </Switch>
        <AccountModal/>
        <WFTMModal/>
        <Toaster position="bottom-right" reverseOrder={false}/>
      </Router>
    </div>
  )
}

export default App
