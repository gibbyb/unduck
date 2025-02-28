# 💣Bang

*This is a fork of [unduck](https://unduck.link) by [Theo](https://github.com/t3dotgg/unduck).*

## Why fork?

This fork allows anyone to easily self host this service & add bangs for their own self-hosted websites. Bang comes pre-configured to work with

- Searxng *!s*
- Gitea *!tea*
- OpenWebUI *!ai*
- Nextcloud App Store *!cloudapp*
- Plex *!plex*
- ~Overseerr *!ov*~ *Overseerr doesn't seem to work correctly*
- Sonarr *!tv*
- Radarr *!mv*
- Lidarr *!mp3*

*Note: We have replaced some of the default bangs from duckduckgo with our own bangs in order to have more simple bangs for the self-hosted websites.*

All you have to do is fill out the environment variables in the .env.example files located in the root directory & the docker directory & rename them to .env.

You can also easily add your own bangs by adding a new entry in the bangs.ts file.

## How to self host

1. Clone the repo & fill out the .env.example files in the root directory & the docker directory & rename them to .env.
    - *Note: Our docker compose assumes you plan to select an external network.*
2. Run the bash script `host-bang` in the docker directory with the root directory of the project as an argument.
    - *Note: You can also simply run it from the root or docker directory without an argument.*

### How to update the website

1. Run the bash script `update-bang` in the docker directory with the root directory of the project as an argument.
    - *Note: You can also simply run it from the root or docker directory without an argument.*

## Theo's words

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

### How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

Theo solved this by doing all of the work client side. Once you've went to https://unduck.link once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.
