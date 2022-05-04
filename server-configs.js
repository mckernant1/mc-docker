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
      return {
        "uuid": it.id,
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
