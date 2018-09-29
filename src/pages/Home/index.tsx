import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtToast } from 'taro-ui'
import { stringify } from 'query-string'
import Q from '../../utils/Q'
import { formatTime } from '../../utils/helpers'
import './index.less'
import { IWhen } from '../../typings/local'

interface IState {
  queryTime: string;
  list: IWhen;
  err: string;
}

export default class Index extends Component<{}, IState> {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props)

    this.state = {
      queryTime: '',
      list: [],
      err: '',
    }
  }

  componentDidMount() {
    const now: Date = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    const queryTime = formatTime(hours, minutes)

    Q(queryTime)
      .then((res) => {
        const list = res.map((item) => {
          return {
            art: item.art,
            author: item.author,
            comment: item.comment,
            id: item.objectId,
            source: item.source,
            time: item.time,
          }
        })

        this.setState({
          list,
        })
      }).catch(() => {
        this.setState({
          err: '网络错误'
        })
      })

    this.setState({
      queryTime,
    })
  }

  onNavToDesc = (item: IWhen) => {
    Taro.navigateTo({
      url: `/pages/Desc/index?${stringify(item)}`
    })
  }

  render () {
    const {
      queryTime,
      list,
      err,
    } = this.state

    return (
      <View className='home at-article'>
        <View className='main-title at-article__h3'>
          现在是 {queryTime}
        </View>

        {
          list.length && <AtList>
            {
              list.map((item: IWhen) => {
                return (
                  <AtListItem
                    key={item.id}
                    arrow='right'
                    note={item.author}
                    title={item.art}
                    onClick={this.onNavToDesc.bind(this, item)}
                  />
                )
              })
            }
          </AtList>
        }

        <AtToast
          text={err}
          icon='close-circle'
          isOpened={err.length !== 0}
        />
      </View>
    )
  }
}
