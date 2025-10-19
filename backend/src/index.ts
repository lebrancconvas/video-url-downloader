import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .post("/download", ({ body, set }) => {
    // const getTitleScript = ["yt-dlp", "get-title", body.videoURL];
    const downloadScript = ["yt-dlp", body.videoURL, "-t", "mp4"];

    const downloadProc = Bun.spawn(downloadScript);

    set.headers["Content-Type"] = "video/mp4";
    set.headers["Content-Disposition"] = "attachment; filename=video.mp4";

    return {
      message: "Download Success",
      data: downloadProc.stdout
    };
  }, {
    body: t.Object({
      videoURL: t.String({ format: "uri" })
    })
  })
  .listen(8001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
