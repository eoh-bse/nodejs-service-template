import type { IIdGenerator } from "src/application/services/IIdGenerator";
import { ulid } from "ulid";

export class IdGenerator implements IIdGenerator {
  generate(): string {
    return ulid();
  }
}
