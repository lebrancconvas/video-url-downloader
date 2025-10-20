import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get("/video", async ({ query, set }) => {
    const { video_url } = query;

    if(!video_url) {
      set.status = 400;
      return {
        error: "Video URL is undefined."
      };
    }

    const titleProc = Bun.spawnSync(["yt-dlp", video_url, "--get-title"]);
    const title = (await new Response(titleProc.stdout).text()).trim() || "";
    return {
      message: "Get Video Data Success.",
      data: {
        title
      }
    }
  }, {
    query: t.Object({
      video_url: t.String({ format: "uri" })
    })
  })
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
