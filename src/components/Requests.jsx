import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const [requestReceived, setRequestReceived] = useState([]);

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      setRequestReceived(response.data.connectionRequest);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  if (requestReceived.length === 0)
    return (
      <h1 className="text-2xl text-center w-full my-4">No Request Received</h1>
    );

  return (
    <div>
      <h1 className="text-2xl text-center w-full my-4">Request Received</h1>
      <ul className="list bg-base-300 mx-22 rounded-box shadow-md">
        {requestReceived.length > 0 &&
          requestReceived.map((data) => {
            return (
              <li key={data._id} className="list-row">
                <div>
                  <img
                    alt="photo"
                    className="size-10 rounded-box object-cover"
                    src={data?.fromUserId?.photoUrl}
                  />
                </div>
                <div>
                  <div>
                    {data?.fromUserId?.firstName +
                      " " +
                      data?.fromUserId?.lastName}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {data?.fromUserId?.about}
                  </div>
                </div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => reviewRequest("rejected", data._id)}
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => reviewRequest("accepted", data._id)}
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Requests;
