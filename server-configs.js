import axios from "axios";


export class CommonProperties {

  constructor(cpu, memory, ops) {
    this.cpu = cpu;
    this.memory = memory;
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
  constructor(cpu, memory, ops, version) {
    super(cpu, memory, ops);
    this.version = version;
  }
}

export class Curseforge extends CommonProperties {

  constructor(cpu, memory, ops, packId, hash) {
    super(cpu, memory, ops);
    this.packId = packId;
    this.hash = hash;
  }

}
