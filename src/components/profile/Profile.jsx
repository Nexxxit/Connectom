import { useState } from "react";

export default function Profile() {
    const [userData, setUserData] = useState({
        first_name: "Имя",
        last_name: "Фамилия",
        username: "@guest",
    });

    const [photoUrl, setPhotoUrl] = useState(null);

  return (
    <>
      <div className="flex gap-4 items-center py-4">
        {photoUrl ? (
            <img
            className="shrink-0 aspect-square size-24 rounded-[36px] object-cover"
            src={photoUrl}
            alt="Фото профиля"
          />
        ) : (
            <div className="shrink-0 aspect-square size-24 rounded-[36px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                    Нет фото
                </span>
            </div>
        )}
        <p className="text-3xl">{`${userData.first_name} ${userData.last_name}`}</p>
      </div>
    </>
  );
}
