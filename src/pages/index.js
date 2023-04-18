import { useContext } from "react";
import MyContext from "./MyContext";
import Autoplayvideo from "@/Components/Common/autoplayvideo";

function HomePage() {
  return (
    <MyContext.Provider value={{ message: "Hello from context!" }}>
      <div>
        <Autoplayvideo />
        <MyComponent />
      </div>
    </MyContext.Provider>
  );
}

export function MyComponent() {
  const { message } = useContext(MyContext);

  return <p>{message}</p>;
}

export default HomePage;
