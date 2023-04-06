/* global process */
const capCase = (str) =>
  str.replaceAll(/-([a-z])/gi, (_, letter) => letter.toUpperCase());

const NO_VALUE = Symbol.for("NO_VALUE");
const startsWithNo = /^no[A-Z]/;
function parseArgs(args) {
  const flags = {};
  const positional = [];
  for (const arg of args) {
    if (arg.startsWith("--")) {
      let prop;
      let value = NO_VALUE;
      const assignment = arg.slice(2).split("=");
      if (assignment.length > 2) {
        throw new Error(
          `Unrecognized argument: "${arg}". Too many equals signs.`
        );
      }
      const isAssignment = assignment.length === 2;
      prop = assignment[0];
      if (isAssignment) {
        value = assignment[1];
      }
      const dotPath = prop.split(".").map(capCase);
      if (dotPath.length > 2) {
        throw new Error(`Unrecognized argument: "${arg}". Too many dots.`);
      }
      let flagTarget = flags;
      const isDotPath = dotPath.length === 2;
      let [flag, subFlag] = dotPath;
      if (isDotPath) {
        if (typeof flags[flag] !== "object") {
          flags[flag] = {};
        }
        flagTarget = flags[flag];
        flag = subFlag;
      }
      if (value === NO_VALUE) {
        value = true;
        if (startsWithNo.test(flag)) {
          flagTarget[flag.charAt(2).toLowerCase() + flag.slice(3)] = false;
        }
      } else if (value === "undefined") {
        value = undefined;
      } else {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // probably a barestring
        }
      }
      flagTarget[flag] = value;
    } else {
      positional.push(arg);
    }
  }
  return { ...flags, _: positional };
}

/* istanbul ignore next */
module.exports = () => parseArgs(process.argv.slice(2));

module.exports.parseArgs = parseArgs;
