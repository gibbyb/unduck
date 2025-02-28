# Bang

*This is a fork of [unduck](https://unduck.link) by [Theo](https://github.com/t3dotgg/unduck).*

## Why fork?

This fork allows anyone to easily self host this service & allows them to easily add bangs for their own self-hosted websites, & comes pre-configured to work with

- Searxng
- Gitea
- OpenWebUI

You can also easily add your own bangs by adding a new entry in the bangs.ts file.

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

```
https://bang.gbrown.org?q=%s
```

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

Theo solved this by doing all of the work client side. Once you've went to https://unduck.link once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.

### How to self host

1. Clone the repo
2. Fill out the .env.example file & rename it to .env
3. Run `pnpm install` from the root of the repo
4. Run `pnpm build` from the root of the repo
5. Navigate to the docker folder & run `docker-compose up -d`

### How to update the website

1. Run `pnpm build` from the root of the repo
2. Navigate to the docker folder & run `docker-compose up -d`
