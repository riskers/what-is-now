import Taro, { Component } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import 'taro-ui/dist/weapp/css/index.css'
import './index.less'
import { IWhen } from '../../typings/local'

interface IState {
  when: IWhen;
}

export default class Index extends Component<{}, IState> {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props)

    this.state = {
      when: {
        id: '',
        art: '',
        author: '',
        comment: '',
        time: '',
        source: '',
      },
    }
  }

  componentDidMount() {
    const when: IWhen = this.$router.params

    this.setState({
      when,
    })
  }

  render () {
    const {
      when,
    } = this.state

    return (
      <View className='desc at-article'>
        <View className='at-article__content'>
          <Text className='at-article__h2'> {when.comment} </Text>
          <View className='at-article__p'>
            {when.source}
          </View>
        </View>
        <View className='info at-article__info'>
          --- {when.author} {when.art}
        </View>
      </View>
    )
  }
}
