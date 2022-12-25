import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./avtar.css";
import "./register.css";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";

const Avtar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvtars] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedAvtar, setSelectedAvtar] = useState(undefined);

  const toastOptions = {
    postion: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvtar === undefined) {
      toast.error("please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));

      console.log("user ", user);
      console.log("userid ", `${setAvatarRoute}/${user?._id}`);

      const { data } = await axios.post(`${setAvatarRoute}/${user?._id}`, {
        image: avatars[selectedAvtar],
      });

      console.log("avtar data", data);

      if (data.isSet) {
        console.log("test5");
        user.isAvtarImageSet = true;
        user.avtarImage = data.image;

        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar, please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const datas = [];
        console.log(datas, "daatas");
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          datas.push(buffer.toString("base64"));
        }
        setAvtars(datas);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  });
  return (
    <>
      {isloading ? (
        <div>
          <img
            src="https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/master/public/src/assets/loader.gif"
            className="loader"
          />
        </div>
      ) : (
        <section className="avatar-image">
          <div className="title-container">
            <h1>Pick an avtar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvtar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64, ${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvtar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="avatar-btn" onClick={setProfilePicture}>
            set as profile picture
          </button>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Avtar;
