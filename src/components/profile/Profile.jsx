import { useEffect, useState } from "react";
import ProfileImage from "../profile_image/Profile_Image";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  const getUserData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          first_name: "Имя",
          last_name: "Фамилия",
          username: "@guest",
        };

        const randomFail = Math.random() < 0.2;

        if (randomFail) {
          reject(new Error("Не удалось загрузить пользователя"));
        } else {
          resolve(data);
        }
      }, 2000);
    });
  };

  useEffect(() => {
    getUserData()
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="flex gap-4 items-center py-4">
        <ProfileImage />
        {userData ? (
          <p className="text-3xl">
            {userData ? `${userData.first_name} ${userData.last_name}` : ""}
          </p>
        ) : (
          <div className="w-2/4 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        )}
      </div>
    </>
  );
}
