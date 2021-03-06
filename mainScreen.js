import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToolbarAndroid,
  DrawerLayoutAndroid,
  Navigator,
} from 'react-native';

import Recommend from './recommend';
import News from './news';
import CarRepair from './app/repair/car_repair.js';

window._navigator;

class MainScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "今日推荐",
    };
  }

  render(){

    let toolbarActions = [{title: '搜索', icon: require('./ic_search_white_18dp_.png'), show: 'always'},
                          {title: '消息', icon: require('./ic_notifications_none_white_18dp_.png'), show: 'always'},
                          {title: '设置', icon: require('./ic_settings_white_18dp_.png'), show: 'always'}];

    let initialRoute = {id: 0, name: "home_recommend",title: "今日推荐"};

    return (
      <View style = {{flex: 1}}>
        <ToolbarAndroid style = {styles.toolbar}
          navIcon = {require('./ic_menu_white_18dp_.png')}
          actions = {toolbarActions}
          title = {this.state.title}
          titleColor = {'#FFFFFF'}
          backgroundColor = {'#3F51B5'}
          onIconClicked = {() => this.props.open()}
          onActionSelected = {(position) => this._showView(position)}>
        </ToolbarAndroid>
        <Navigator
          initialRoute={initialRoute}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FadeAndroid;
          }}
          renderScene={(route,navigation) => {
            _navigator = navigation;
            if(route.name === 'home_recommend'){
              return (<Recommend style = {{flex: 1}}/>);
            }else if(route.name === 'home_news'){
              return (<News style = {{flex: 1}}/>);
            }else if(route.name === 'home_repair'){
              return (<CarRepair style = {{flex: 1}}/>);
            }
          }}
          />
      </View>
    );
  }

  _showView(position: number){

    switch (position) {
      case 0:
        this.props.showView({id: 1, title: "搜索", name: "search"});
        break;
      case 1:
        this.props.showView({id: 2, title: "消息", name: "message"});
        break;
      case 2:
        this.props.showView({id: 3, title: "设置", name: "setting"});
        break;
      default:
        break;
    }
  }

  _showNews(target: Object) {
    for(var route of _navigator.getCurrentRoutes()){
      if(target.id === route.id){
        this.setState({title: route.title});
        window._navigator.jumpTo(route);
        return;
      }
    }
    this.setState({title: target.title});
    window._navigator.push(target);
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 55,
  },
});

export default MainScreen;
