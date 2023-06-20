// Generated by Xata Codegen 0.23.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "spinners",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "aliases", type: "multiple" },
      { name: "board", type: "string" },
      { name: "twitter_name", type: "string" },
      { name: "twitter_link", type: "string" },
      { name: "youtube_name", type: "string" },
      { name: "youtube_link", type: "string" },
      { name: "other_links", type: "multiple" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Spinners = InferredTypes["spinners"];
export type SpinnersRecord = Spinners & XataRecord;

export type DatabaseSchema = {
  spinners: SpinnersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://Tom-B-n-s-workspace-d1igoc.us-east-1.xata.sh/db/sdex",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
