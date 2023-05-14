import './chatList.css';
import type { User } from 'behavior/authentication/types';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import ChatListItems from './ChatListItems';
import CreateConversationModal from 'components/modal/CreateConversationModal';
import { Chat } from 'behavior/messages/types';
import AddIcon from '@mui/icons-material/Add';
import { getUsers } from 'behavior/users/helpers';
import useActions from 'hooks/useActions';

type Props = {
  setCurrentChatKey: Dispatch<SetStateAction<string | undefined>>;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const ChatList = ({ setCurrentChatKey, setUser }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState<User[]>([]);

  const { messageReceived } = useActions();

  useEffect(() => {
    getUsers(users => setLoadedUsers(users));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadedChats = useAppSelector(state => state.messages?.chats);
  const currentUserId = useAppSelector(state => state.user?.id);

  const onChatClick = (userId: number, chatId: string) => {
    setCurrentChatKey(chatId);
    setUser(loadedUsers.find(u => u.id === userId));
  };

  const onOpenCreateConversationModalClick = () => {
    setModalVisible(true);
  };

  const handleCreateConverstion = (receiverId: number) => {
    const isChatAlreadyExist = !!loadedChats.find(chat => chat.messages.find(m => m.receiverId === receiverId || m.senderId === receiverId));

    if (isChatAlreadyExist) {
      setModalVisible(false);
      return;
    }

    const msg = {
      senderId: currentUserId ?? 0,
      receiverId,
    };

    messageReceived(msg);
    setModalVisible(false);
  };

  const getUserName = (chat: Chat) => {
    if (chat.messages.length === 0) {
      const index = chat.id.indexOf('_');
      const firstPart = chat.id.substring(index + 1);
      const userId = Number(firstPart.substring(0, firstPart.indexOf('_')));

      const user = loadedUsers.find(user => user.id === userId);
      return {
        id: user?.id,
        name: user?.firstname + ' ' + user?.lastname,
      };
    }

    const user = loadedUsers.find(user => {
      return chat.messages.some(message => {
        return (message.receiverId === user.id && message.receiverId !== currentUserId) ||
          (message.senderId === user.id && message.senderId !== currentUserId);
      });
    });

    return {
      id: user?.id,
      name: user?.firstname + ' ' + user?.lastname,
    };
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
        <div className="chatlist__items">
          {loadedChats.map((chat, index) => {
            return (
              <ChatListItems
                user={getUserName(chat)}
                key={index}
                onClick={onChatClick}
                chatId={chat.id}
                lastMessage={chat.messages[chat.messages.length - 1]?.value}
                animationDelay={index + 1}
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
