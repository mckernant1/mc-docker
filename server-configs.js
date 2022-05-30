import axios from "axios";


export class CommonProperties {

  constructor(ops) {
    this.ops = ops;
  }

  async getOpsJson() {
    const opsData = await axios.post(`https://api.mojang.com/profiles/minecraft`, this.ops, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return opsData.data.map(it => {
      const id = it.id
      return {
        "uuid": `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}`,
        "name": it.name,
        "level": 4,
        "bypassesPlayerLimit": false
      }
    });
  }

}

export class Paper extends CommonProperties {
  constructor(ops, version) {
    super(ops);
    this.version = version;
  }
}

export class Curseforge extends CommonProperties {

  constructor(ops, packId, hash) {
    super(ops);
    this.packId = packId;
    this.hash = hash;
  }

}
