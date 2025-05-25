import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connectionList, setConnectionList] = useState([]);
  const getConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });

      setConnectionList(response.data.data);

      console.log(response, "ConnectionResponse");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(connectionList, "connectionList");

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center w-full">My Connections List </h1>

      <ul className="list bg-base-300 mx-22 mt-2  rounded-box shadow-md">
        {connectionList.length > 0 &&
          connectionList.map((data) => {
            return (
              <li className="list-row">
                <div>
                  <img
                    alt="photo"
                    className="size-10 rounded-box"
                    src={data?.photoUrl}
                  />
                </div>
                <div>
                  <div>{data.firstName + " " + data.lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {data?.about}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Connections;
