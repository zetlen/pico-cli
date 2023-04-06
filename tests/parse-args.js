import tap from "tap";
import { parseArgs } from "../index.js";

tap.test("matching arg", (t) => {
  t.matchSnapshot(parseArgs(["--no-duh"]));
  t.end();
});
