import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "feed", {
        withCredentials: true,
      });

      dispatch(addFeed(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log(feed, "feedData");

  if (feed?.length === 0) {
    return (
      <h1 className="text-2xl text-center w-full my-4">No new Users found!</h1>
    );
  }

  return (
    feed?.length > 0 && (
      <div className="flex justify-center my-2">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
