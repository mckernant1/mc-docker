const Curseforge = require("node-curseforge");
const {ModsSearchSortField} = require("node-curseforge/dist/objects/enums");

let cf = new Curseforge.default(process.env['CURSEFORGE_API_KEY']);

async function findMod(modId, hash) {
  for await (const file of getAllFiles(modId)) {
    if (file.hashes.some(it => it.value === hash)) {
      return await cf.get_file_download(modId, file.alternateFileId);
    }
  }
}

async function* getAllFiles(mod, gameVersionTypeId) {
  let files = await cf.get_files(mod, {gameVersionTypeId});
  let totalPages = files.paging.totalCount;

  for (let i = 0; i < totalPages; ++i) {
    let files = await cf.get_files(mod, {
      gameVersionTypeId,
      index: i
    });
    console.error(`${i}/${totalPages}: FILES - ${files.length} entries`)
    yield* files;
  }
}


const modPackId = parseInt(process.argv[2]);
const hash = process.argv[3];
console.error(`Finding modpack with Id: ${modPackId}, and hash ${hash}`)
findMod(modPackId, hash).then(m => {
  console.error(`Got most recent server pack ${m}`)
  console.log(encodeURI(m));
});
