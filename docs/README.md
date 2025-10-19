# Documentation

## Workflow

- Get the URL
- Check the URL, Is it valid?
- If not: Alert!
- If valid:
  - Send it to the server for running `yt-dlp`
  - Get the .mp4 file
  - Send it back to the client
  - Select where to save the .mp4 file.
  - File save and success.

## API 

- **/api**
  - ***(POST) /download***
    Request Body
      - Video URL: string
    Function
      - Run the downloading script and get the file.
    Return Data
      - .mp4 Video File
  - ***(GET) /information?video_url***
    Query Input
      - video_url: string
    Function
      - Get the video information from the url.
    Return Data
      - Video Information
