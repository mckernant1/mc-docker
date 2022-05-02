import axios from "axios";


export async function getPaperDownloadLink(mcVersion) {
  let buildVersions = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${mcVersion}`);

  let maxBuild = Math.max(...buildVersions.data['builds'])

  let downloads = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${maxBuild}`)

  let downloadName = downloads.data['downloads']['application']['name']

  return `https://papermc.io/api/v2/projects/paper/versions/${mcVersion}/builds/${maxBuild}/downloads/${downloadName}`
}


