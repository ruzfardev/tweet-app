import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import {IPolitician} from "../model/politician.model";
import {ITweet} from "../model/tweet.model";

export interface GlobalStateInterface {
  selectedUser: any;
  users: IPolitician[];
  tweets: ITweet[];
}
const GlobalStateContext = createContext({
  users: [] as IPolitician[],
  tweets: [] as ITweet[],
  setUsers: {} as Dispatch<SetStateAction<IPolitician[]>>,
  setTweets: {} as Dispatch<SetStateAction<ITweet[]>>,
  // setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
  children,
  value = [] as any,
}: {
  children: React.ReactNode;
  value?: Partial<any>;
}) => {
  const [state, setState] = useState(value);
  const [users, setUsers] = useState<IPolitician[]>([]);
    const [tweets, setTweets] = useState<ITweet[]>([]);
  return (
    <GlobalStateContext.Provider
      value={{
        users,
        tweets,
        setUsers,
        setTweets,
        // setState,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
