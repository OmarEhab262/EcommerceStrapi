import { Skeleton } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Skeleton startColor="white" endColor="black" height="20px" />
    </div>
  );
};

export default HomePage;
