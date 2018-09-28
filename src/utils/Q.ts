import Bmob from 'hydrogen-js-sdk'
import * as BombConfig from '../bomb.config'

Bmob.initialize(BombConfig.appId, BombConfig.restKey)

const query = Bmob.Query('time')

const Q = (time: string) => {
  query.equalTo('time', '==', time)
  return query.find()
}

export default Q
