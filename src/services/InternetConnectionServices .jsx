import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toastIdRef = useRef();
  const [isOnline, setIsOnline] = useState(true);

  function close() {
    toast.closeAll(toastIdRef.current);
  }

  const setOnline = () => {
    setIsOnline(true);
    dispatch(networkMode(true));
    close();
  };

  const setOffline = () => {
    setIsOnline(false);
    dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  function addToast() {
    if (!toast.isActive(toastIdRef.current)) {
      toastIdRef.current = toast({
        title: "Connection Lost",
        description: "Please check your internet connection",
        status: "warning",
        duration: null,
        isClosable: true,
        icon: <BsWifiOff size={20} />,
      });
    }
  }

  return children;
};

export default InternetConnectionProvider;
