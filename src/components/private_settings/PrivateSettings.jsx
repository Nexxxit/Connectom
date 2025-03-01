import { useEffect, useState, useRef } from "react";

export default function PrivateSettings() {
  const [privateSettings, setPrivateSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const debounceTimer = useRef(null);
  const formRef = useRef(null);

  const getPrivateSettingsData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const privateSettingsData = [
        {
          name: "show_telegram_username",
          type: "checkbox",
          value: true,
          label: "Показывать моё имя пользователя Telegram",
        },
        {
          name: "login",
          type: "text",
          value: "",
          label: "Логин",
        },
        {
          name: "password",
          type: "text",
          value: "",
          label: "Пароль",
        },
      ];

      setLoading(false);

      if (Math.random() < 0.2) {
        throw new Error("Не удалось загрузить настройки приватности");
      }

      return privateSettingsData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchPrivateSettings = async () => {
      try {
        const privateSettings = await getPrivateSettingsData();
        setPrivateSettings(privateSettings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateSettings();
  }, []);

  const handleChangePrivateSetting = (e) => {
    const { name, type, checked, value } = e.target;
    setPrivateSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.name === name
          ? {
              ...setting,
              value: type === "checkbox" ? checked : value,
            }
          : setting
      )
    );

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      handleSubmitForm();
    }, 2000);
  };

  const handleSubmitForm = () => {
    console.log("Форма отправлена:", privateSettings);

    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const privateSettingsList = privateSettings
    ? privateSettings.map((setting) => (
        <div
          key={setting.name}
          className="flex flex-col gap-1 items-start justify-center"
        >
          <label htmlFor={setting.name}>{setting.label}</label>
          <input
            name={setting.name}
            id={setting.name}
            type={setting.type}
            {...(setting.type !== "checkbox" ? { value: setting.value } : {})}
            {...(setting.type === "checkbox" ? { checked: setting.value } : {})}
            onChange={handleChangePrivateSetting}
            className={`border p-1 rounded-xl ${
              setting.type !== "checkbox" ? "md:w-80 w-full" : ""
            }`}
          />
        </div>
      ))
    : [];

  return (
    <div className="border border-gray-500 rounded-2xl p-6 shadow-sm">
      {loading ? (
        <div className="flex flex-col gap-3">
          <div className="w-full h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-3/4 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmitForm}
          action=""
          method=""
          className="flex flex-col gap-3"
        >
          {privateSettingsList}
        </form>
      )}
    </div>
  );
}
