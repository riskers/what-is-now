import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtToast } from 'taro-ui'
import Q from '../../utils/Q'
import { formatTime } from '../../utils/helpers'
import './index.less'

interface IWhen {
  id: string;
  time: string;
  art: string;
  author: string;
  comment: string;
  source: string;
}

interface IState {
  queryTime: string;
  list: IWhen[];
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
        console.log(res)
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

  render () {
    const {
      queryTime,
      list,
      err,
    } = this.state

    return (
      <View className='index'>
        <View className='main-title'>
          现在是 {queryTime}
        </View>

        <AtList>
          {
            list.map((item: IWhen) => {
              return (
                <AtListItem
                  key={item.id}
                  arrow='right'
                  note={item.author}
                  title={item.art}
                  extraText={item.author}
                />
              )
            })
          }
        </AtList>

        <AtToast
          text={err}
          icon='close-circle'
          isOpened={err.length !== 0}
        />
      </View>
    )
  }
}

