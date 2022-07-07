import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [value, setValue] = useState("");
  const [hist, setHist] = useState([]);
  useEffect(() => {
    const localData = JSON.parse(window.localStorage.getItem("recent"));
    localData && setHist(localData);
  }, []);

  function onChange(event) {
    setValue(event.target.value);
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    searchTerm &&
      setHist([...hist, { name: searchTerm, id: searchTerm.length }]);
    setValue("");
    updateStorage();
  };

  const updateStorage = () => {
    window.localStorage.setItem("recent", JSON.stringify(hist));
  };

  return (
    <div className="App">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {hist &&
            hist
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const name = item.name.toLowerCase();

                return (
                  searchTerm &&
                  name.startsWith(searchTerm) &&
                  name !== searchTerm
                );
              })
              .slice(0, 5)
              .map((item) => (
                <div
                  onClick={() => setValue(item.name)}
                  className="dropdown-row"
                  key={item.name}
                >
                  {item.name}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
