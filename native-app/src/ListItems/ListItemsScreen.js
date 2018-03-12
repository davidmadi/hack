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
  Right
} from "native-base";

export default class ListItemsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {itemsList:[{id:0, name:"Loading"}], isLoading: true};
    this.fetchList = this.fetchList.bind(this);
  }

  componentDidMount(){
    this.fetchList();
  }

  connectSocket(){
    var ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      // connection opened
      ws.send('something'); // send a message
    };
    
    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };    
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

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")} >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>List of Items</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>This is the list of Items!</Text>
              </Body>
            </CardItem>
          </Card>
          {this.state.itemsList.map((item) => {
            return (
              <Text key={item.id}>{item.name}</Text>
            );
          })}
        </Content>
      </Container>
    );
  }
}
