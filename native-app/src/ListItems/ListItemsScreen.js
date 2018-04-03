import React from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  List,
  ListItem,
  Right,
  Image
} from "native-base";
import SocketIOClient from 'socket.io-client';
import ListSubItemsScreen from '../ListSubItems/ListSubItemsScreen';


export default class ListItemsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemsList:[{id:0, name:"Loading"}], isLoading: true};
    this.fetchList = this.fetchList.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
    this.replaceItem = this.replaceItem.bind(this);
    this.navigateToItem = this.navigateToItem.bind(this);
  }

  componentDidMount(){
    this.fetchList();
    this.connectSocket();
  }

  connectSocket(){
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('itemChange', (response) => 
      this.replaceItem(response[0])
      //alert(response)
    );
  }

  replaceItem(item){
    const newList = this.state.itemsList.filter(i => i.id != item.id);
    newList.push(item);
    this.setState({itemsList:newList})
  }

  fetchList(){
    this.setState({itemsList:[{id:0, name:"Loading"}], isLoading: true});

    fetch('http://localhost:8080/item/loadlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        itemsList:responseJson,
      });
    })
    .catch((error) =>{
      this.setState({itemsList:[{id:0, name:error.message }]});
    });
  }

  navigateToItem(item){
    this.props.navigation.navigate("ListSubItems", {itemid : item.id});
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>List of items</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List
            dataArray={this.state.itemsList.sort(function(a, b){ return a.name > b.name; })}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <Card>
                  <CardItem
                   button
                   onPress={this.navigateToItem.bind(this, data)}>
                    <Body>
                      <Text>{data.name}</Text>
                    </Body>
                  </CardItem>
                </Card>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
