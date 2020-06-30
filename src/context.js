import React, { Component } from 'react';
import items from './data'
import FeaturedRooms from './components/FeaturedRooms';
import { FaInstagramSquare } from 'react-icons/fa';

const RoomContext =React.createContext();
// <RoomContext.Provider value ={'hello'}

class RoomProvider extends Component {
state={
    rooms:[],
    sortedRooms:[],
    featuredRooms:[],
    loading:true
    };
    // getData
componentDidMount() {
    let rooms = this.formatData(items);
    console.log(rooms);
    let featuredRooms = rooms.filter(room => room.featured === true);
    this.setState({
        rooms,featuredRooms,sortedRooms:rooms, loading:false
    });
}

formatData(items){
    let tempItems = items.map(item =>{
        let id =item.sys.id;
        let images = items.fields.images.map(image=> image.fields.file.url);
        let room = {...item.fields, images,id}
        return room;
    });
    return tempItems
}

    render() {
        return (
            <RoomContext.Provider value={{...this.state}}>
                {this.props.children}
            </RoomContext.Provider>
            
        )
    }
}
const RoomConsumer = RoomContext.Consumer;

export{RoomProvider,  RoomConsumer, RoomContext};