import { useEffect, useState } from "react";
import PencilIcon from "../../icons/pencil.svg?react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
    }
  };

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
      .then(data => setUserData(data))
      .catch(error => console.log(error));
  }, [])

  return (
    <>
      <div className="flex gap-4 items-center py-4">
        <div className="relative overflow-hidden">
          {photoUrl ? (
            <img
              className="shrink-0 aspect-square size-24 rounded-[36px] object-cover"
              src={photoUrl}
              alt="Фото профиля"
            />
          ) : (
            <div className="shrink-0 aspect-square size-24 rounded-[36px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Нет фото</span>
            </div>
          )}

          <label className="absolute bottom-0 right-0 bg-blue-500 shrink-0 aspect-square rounded-[36px] p-2 cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <PencilIcon className="w-4 h-4 text-white" />
          </label>
        </div>
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
