import {Curseforge, Paper} from "./server-configs.js";
import {getCFDownloadLink} from "./cf.js";
import download from 'download';
import {getPaperDownloadLink} from "./paper.js";
import fs from 'fs';

async function main() {
  const serverType = process.env['SERVER_TYPE']
  const serverJson = JSON.parse(process.env['SERVER_JSON'])

  let server;
  switch (serverType.toLowerCase()) {
    case "vanilla":
      server = Object.assign(new Paper, serverJson);
      let paperUrl = await getPaperDownloadLink(server.version);
      console.log(`Got DownloadURL ${paperUrl}`)
      await download(encodeURI(paperUrl), 'data')
      break;
    case "curseforge":
      server = Object.assign(new Curseforge, serverJson);
      let modUrl = await getCFDownloadLink(parseInt(server.packId), server.hash);
      console.log(`Got DownloadURL ${modUrl}`)
      await download(encodeURI(modUrl), 'data');
      break;
  }
  console.log(server);
  let j = await server.getOpsJson();
  fs.writeFile('ops.json', JSON.stringify(j), (e) => console.error(e))
}
// examples();
main().then();

function examples() {
  console.log(JSON.stringify(new Paper(2, 2048, ['TheeAlbinoTree'], '1.18.2')))
  console.log(JSON.stringify(new Curseforge(2, 2048, ['TheeAlbinoTree'], 452013, 'f23855a2b61db5f7a40e81d3a5f0ae48')))
}
