const Curseforge = require("node-curseforge");
const {ModsSearchSortField} = require("node-curseforge/dist/objects/enums");

let cf = new Curseforge.default(process.env['CURSEFORGE_API_KEY']);

async function findMod(modId) {
  for await (const mod of getAllMods()) {
    if (mod.id !== modId) continue;
    let m = mod.latestFiles[1];
    let mostRecent = {
      fileDate: Date.UTC(2000, 1)
    };
    for await (const file of getAllFiles(mod, m.sortableGameVersions.find(it => true).gameVersionTypeId)) {
      mostRecent = mostRecent.fileDate > file.fileDate ? mostRecent : file
    }
    return await cf.get_file_download(mod, mostRecent.alternateFileId);
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


async function* getAllMods() {
  let mc = await cf.get_game('minecraft');
  let mods = await mc.search_mods({
    sortField: ModsSearchSortField.TOTAL_DOWNLOADS,
    categoryId: 4484,
    sortOrder: "desc"
  });
  let totalPages = mods.paging.totalCount

  for (let i = 0; i < totalPages; ++i) {
    let mods = await mc.search_mods({
      sortField: ModsSearchSortField.TOTAL_DOWNLOADS,
      sortOrder: "desc",
      categoryId: 4484,
      index: i
    });
    console.error(`${i}/${totalPages}: MODS - ${mods.length} entries`)
    yield* mods;
  }
}


findMod(381671).then(m => {
  console.log(m);
});
