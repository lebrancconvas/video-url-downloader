import React, { useState } from "react";
import "./index.css";

export function App() {
  const [videoURL, setVideoURL] = useState<string>("");

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('URL: ', videoURL);
  };

  return (
    <>
      <header>
        <h1>Video Downloader</h1>
        <h3>Convert YouTube / Bilibili / Vimeo / Dailymotion link to MP4</h3>
      </header>
      <div>
        <form onSubmit={handleConvert}>
          <input type="url" name="video-url" id="video-url" onChange={(e) => setVideoURL(e.target.value)} />
          <input type="submit" value="Convert" />
        </form>
      </div>
    </>
  )
}

export default App;