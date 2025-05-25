import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "feed", {
        withCredentials: true,
      });
      setFeed(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(feed, "FeedData");

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed.length > 0 && (
      <div className="flex justify-center my-2">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
