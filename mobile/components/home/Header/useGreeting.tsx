import { useEffect, useState } from "react";

function useGreeting(): string {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting("Good morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return greeting;
}

export default useGreeting;