import { useEffect, useState, useRef } from "react";
import ThreeDotIcon from "../../icons/three-dots-vertical.svg?react";
import CheckCircleIcon from "../../icons/check-circle.svg?react";

export default function TagsList() {
  const dropdownRef = useRef([]);
  const [userTags, setUserTags] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");

  const openDropdown = (id) => {
    setOpenDropdownId(id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = dropdownRef.current.every(
        (refElement) => refElement && !refElement.contains(event.target)
      );

      if (isOutside) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const getTagsData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tagsData = [
          {
            title: "Готов делиться:",
            tags: [
              { id: 1, name: "журналистика" },
              { id: 2, name: "написание текстов" },
              { id: 3, name: "редактирование информации" },
              { id: 4, name: "исследования  и интервью" },
              { id: 5, name: "копирайтинг" },
              { id: 6, name: "шахматы" },
            ],
          },
          {
            title: "Ищу:",
            tags: [
              { id: 7, name: "SMM" },
              { id: 8, name: "маркетинг" },
              { id: 9, name: "управление командой" },
              { id: 10, name: "лидерство" },
              { id: 11, name: "менеджмент" },
            ],
          },
          {
            title: "Просто интересно:",
            tags: [
              { id: 12, name: "история и литература" },
              { id: 13, name: "походы на природу" },
            ],
          },
        ];

        const randomFail = Math.random() < 0.2;

        if (randomFail) {
          reject(new Error("Не удалось загрузить теги"));
        } else {
          resolve(tagsData);
        }
        setLoading(false);
      }, 2000);
    });
  };

  useEffect(() => {
    getTagsData()
      .then((tagsData) => setUserTags(tagsData))
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteTag = (id) => {
    setUserTags((prevTags) =>
      prevTags.map((category) => ({
        ...category,
        tags: category.tags.filter((tag) => tag.id !== id),
      }))
    );

    dropdownRef.current = dropdownRef.current.filter((refElement) => {
      return refElement.id !== id;
    });
  };

  const handleEditTag = (id, name) => {
    setEditingTagId(id);
    setEditedTagName(name);
    setOpenDropdownId(null);
  };

  const handleSaveEditTag = (id, name) => {
    if (editedTagName.trim() === name) {
      setEditingTagId(null);
      return;
    }

    setUserTags((prevTags) =>
      prevTags.map((category) => ({
        ...category,
        tags: category.tags.map((tag) =>
          tag.id === id ? { ...tag, name: editedTagName.trim() } : tag
        ),
      }))
    );
    setEditingTagId(null);
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
  };

  const tagsLists = userTags
    ? userTags.map((tagsList) => (
        <div key={tagsList.title}>
          <h3 className="font-bold text-lg">{tagsList.title}</h3>
          <ul className="flex flex-col gap-1">
            {tagsList.tags.map((tag) => (
              <li
                key={tag.id}
                className="flex justify-between items-center gap-5 relative"
              >
                {editingTagId === tag.id ? (
                  <input
                    onChange={(e) => setEditedTagName(e.target.value)}
                    onBlur={handleCancelEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleSaveEditTag(tag.id, tag.name);
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus
                    className="border-b pb-0 ps-0 items-center grow focus:outline-0"
                    value={editedTagName}
                  />
                ) : (
                  <p>{tag.name}</p>
                )}
                {editingTagId === tag.id ? (
                  <button
                    className="rounded-xl p-2 flex justify-center items-center cursor-pointer"
                    onMouseDown={() => handleSaveEditTag(tag.id, tag.name)}
                  >
                    <CheckCircleIcon className="size-[26px] fill-lime-500" />
                  </button>
                ) : (
                  <button
                    className="rounded-xl p-2 flex justify-center items-center cursor-pointer"
                    onClick={() => openDropdown(tag.id)}
                  >
                    <ThreeDotIcon className="size-[26px]" />
                  </button>
                )}
                <ul
                  ref={(element) => {
                    if (element !== null) {
                      dropdownRef.current.push(element);
                    }
                  }}
                  className={`absolute right-0 mt-30 w-34 shadow-sm bg-white z-1 rounded-xl flex flex-col items-center justify-center ${
                    openDropdownId === tag.id ? "" : "hidden"
                  }`}
                >
                  <li className="w-full hover:bg-gray-200 p-3 rounded-t-xl active:bg-gray-300">
                    <button
                      onClick={() => handleEditTag(tag.id, tag.name)}
                      className="w-full cursor-pointer"
                    >
                      Редактировать
                    </button>
                  </li>
                  <li className="w-full hover:bg-gray-200 p-3 rounded-b-xl active:bg-gray-300">
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="w-full cursor-pointer"
                    >
                      Удалить
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))
    : [];

  return (
    <div className="border border-gray-500 rounded-2xl flex flex-col gap-3 p-6 h-90 overflow-y-auto shadow-sm">
      {loading ? (
        <div className="flex flex-col gap-3">
          <div className="w-full h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-3/4 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      ) : (
        tagsLists
      )}
    </div>
  );
}
