import { createContext } from "react";

type User = {
  user:
    | {
        name: string;
        email: string;
        phoneNumber: string;
        likedShops: string[];
        likedCoffees: string[];
      }
    | undefined;
  setUser: (user: any) => void;
};

const UserContext = createContext<User>({
  user: {
    name: "",
    email: "",
    phoneNumber: "",
    likedShops: [],
    likedCoffees: [],
  },
  setUser: (user: any) => {},
});

export default UserContext;
