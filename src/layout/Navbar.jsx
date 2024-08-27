"use client";

import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CookieService from "../services/CookieService";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";
const Links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Products",
    path: "/products",
  },
];
const NavLink = ({ name, path }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={path}
    >
      {name}
    </Link>
  );
};
const LogIn = () => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={"/login"}
    >
      {"Login"}
    </Link>
  );
};
const LogOut = () => {
  CookieService.remove("jwt");
  window.location.reload();
};
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogged = CookieService.get("jwt"); // Get JWT token
  const { cartProducts } = useSelector(selectCart);
  const dispatch = useDispatch();
  const onOpenDrawer = () => {
    dispatch(onOpenCartDrawerAction());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Button as={Link} to="/" variant={"ghost"}>
              My App
            </Button>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.path} name={link.name} path={link.path} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                onClick={toggleColorMode}
                variant={"ghost"}
                display={{ base: "none", md: "flex" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                onClick={() => {
                  onOpenDrawer();
                }}
              >
                Cart ({cartProducts.length})
              </Button>

              <Menu>
                {isLogged ? null : (
                  <Button
                    display={{ base: "none", md: "flex" }}
                    as={Link}
                    to="/login"
                    variant={"ghost"}
                  >
                    Login
                  </Button>
                )}

                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={LogOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Button onClick={toggleColorMode} variant={"ghost"}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.path} name={link.name} path={link.path} />
              ))}

              {isLogged ? null : <LogIn />}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
