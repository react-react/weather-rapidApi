import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null as any);

  // useEffect(() => {
  //   getData();
  // }, []);

  async function getData() {
    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/${search || "hanoi"}`,
      headers: {
        "X-RapidAPI-Key": "9a3d40ad6emsh149dd2741462c79p1ceaffjsn4768e2a0dd7e",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-full bg-black bg-no-repeat bg-cover flex flex-col">
      <div className="text-center py-8">
        <input
          type="text"
          name="search"
          className="px-4 py-2 border border-slate-300 rounded-full w-full max-w-60 focus:outline-none"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getData();
            }
          }}
        />
      </div>

      <div className="flex justify-around text-amber-500 px-8 py-20">
        <div className="">
          <h1 className="text-4xl font-bold my-8">{data?.name || "city"}</h1>
          <div className="text-2xl">{data?.main?.temp || 0} &#xb0; F</div>
        </div>

        <div className="min-h-20 -rotate-90 text-2xl capitalize">
          {data?.weather?.[0]?.main || "clear"}
        </div>
      </div>

      <div className="mt-auto mb-8 flex justify-center gap-4 text-white ">
        <div className="flex justify-center gap-16 rounded-md bg-white/20  px-16 py-8">
          <div>
            <p>{data?.main?.feels_like || 0} &#xb0; F</p>
            <p>Feels Like</p>
          </div>

          <div>
            <p>{data?.main?.humitidy || 0}%</p>
            <p>Humidity</p>
          </div>

          <div>
            <p>{data?.wind?.speed || 0} MPH</p>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
