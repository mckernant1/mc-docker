import Curseforge from "node-curseforge";

let cf = new Curseforge.default(process.env['CURSEFORGE_API_KEY']);

export async function getCFDownloadLink(modId, hash) {
  console.log(`Looking for ModId: ${modId} with hash ${hash}`)
  for await (const file of getAllFiles(modId)) {
    if (file.hashes.some(it => it.value === hash)) {
      return await cf.get_file_download(modId, file.alternateFileId);
    }
  }
}

async function* getAllFiles(mod) {
  let files = await cf.get_files(mod);
  let totalPages = files.paging.totalCount;

  for (let i = 0; i < totalPages; ++i) {
    let files = await cf.get_files(mod, {
      index: i
    });
    console.error(`${i}/${totalPages}: FILES - ${files.length} entries`)
    yield* files;
  }
}


// const modPackId = parseInt(process.argv[2]);
// const hash = process.argv[3];
// console.error(`Finding modpack with Id: ${modPackId}, and hash ${hash}`)
// getCFDownloadLink(modPackId, hash).then(m => {
//   console.error(`Got most recent server pack ${m}`)
//   console.log(encodeURI(m));
// });
