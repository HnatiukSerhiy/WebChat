import './chatList.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import ChatListItems from './ChatListItems';
import CreateConversationModal from 'components/modal/CreateConversationModal';
import { Chat, EmptyChat } from 'behavior/messages/types';
import { getAllUsersQuery } from 'behavior/users/queries';
import { UserGetAllResponse } from 'behavior/users/types';
import performGraphRequest from 'api/performGraphRequest';
import { User } from 'behavior/authentication/types';
import { map } from 'rxjs';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  setCurrentChatKey: Dispatch<SetStateAction<string | undefined>>;
};

const getUsers = (onSubscribe: (users: User[]) => void) => {
  const observable = performGraphRequest<UserGetAllResponse>(getAllUsersQuery).pipe(
    map(response => response.user.getAll),
  );
  observable.subscribe(onSubscribe);
};

const ChatList = ({ setCurrentChatKey }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [emptyChats, setEmptyChats] = useState<EmptyChat[]>([]);
  const [loadedUsers, setLoadedUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers(users => setLoadedUsers(users));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadedChats = useAppSelector(state => state.messages?.chats);
  const currentUserId = useAppSelector(state => state.user?.id);

  const onChatClick = (chatId: string) => {
    setCurrentChatKey(chatId);
  };

  const onOpenCreateConversationModalClick = () => {
    setModalVisible(true);
  };

  const handleCreateConverstion = (receiverId: number) => {
    setEmptyChats(chats => [{ receiverId }, ...chats]);
    setModalVisible(false);
  };

  const getUserName = (chat: Chat | EmptyChat) => {
    if ('receiverId' in chat) {
      const user = loadedUsers.find(user => user.id === chat.receiverId);
      return user?.firstname + ' ' + user?.lastname;
    }

    const user = loadedUsers.find(user => {
      return chat.messages.some(message => {
        return (message.receiverId === user.id && message.receiverId !== currentUserId) ||
          (message.senderId === user.id && message.senderId !== currentUserId);
      });
    });

    return user?.firstname + ' ' + user?.lastname;
  };

  return (
    <>
      <div className="main__chatlist">
        <button className="btn" onClick={onOpenCreateConversationModalClick}>
          <i className="fa fa-plus">
            <AddIcon />
          </i>
          <span>New conversation</span>
        </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h" />
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {emptyChats.map((chat, index) => {
            return (
              <ChatListItems
                name={getUserName(chat)}
                key={index}
                onClick={onChatClick}
                chatId={index.toString()}
                animationDelay={index + 1}
                // active={chat.active ? 'active' : ''}
                isOnline={''}
              />
            );
          })}
          {loadedChats.map((chat, index) => {
            return (
              <ChatListItems
                name={getUserName(chat)}
                key={index}
                onClick={onChatClick}
                chatId={chat.id}
                lastMessage={chat.messages[chat.messages.length - 1].value}
                animationDelay={index + 1}
                // active={chat.active ? 'active' : ''}
                isOnline={''}
              />
            );
          })}
        </div>
      </div>
      <CreateConversationModal
        visible={isModalVisible}
        handleClose={() => setModalVisible(false)}
        handleCreateConversation={handleCreateConverstion}
      />
    </>
  );
};

export default ChatList;
