import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  
  const lastMessage = chatMessages?.[chatMessages.length -1]

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      });

    return unsubscribe;
  }, []);

  return (
    <ListItem 
      key={id} 
      bottomDivider
      onPress={() => enterChat(id, chatName)}
    >
      <Avatar
        rounded
        source={{
          uri: lastMessage?.photoURL || 
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800"}}>
          { chatName }
        </ListItem.Title>

        <ListItem.Subtitle 
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          { lastMessage?.displayName }: { lastMessage?.message }
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
