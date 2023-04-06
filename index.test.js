const { parseArgs } = require("./index.js");

const passes = {
  "positional and flag": [
    ["doof", "foo", "--baz", "bar"],
    {
      _: ["doof", "foo", "bar"],
      baz: true,
    },
  ],
  "flag with false": [
    ["--baz=false"],
    {
      baz: false,
    },
  ],
  "negated flag": [
    ["--no-baz"],
    {
      baz: false,
      noBaz: true,
    },
  ],
  "special case for 'undefined'": [
    ["--baz=undefined"],
    {
      baz: undefined,
    },
  ],
  barestring: [
    ["--hoop=doop", '--floop={"zoop":[5]}', "--floop.zoop=15"],
    {
      hoop: "doop",
      floop: {
        zoop: 15,
      },
    },
  ],
  "dot path": [
    ["sea", "--under", "--distance.leagues=10000"],
    {
      _: ["sea"],
      under: true,
      distance: {
        leagues: 10000,
      },
    },
  ],
};

const fails = {
  "too many equals signs": [
    ["--what=is=this"],
    'Unrecognized argument: "--what=is=this". Too many equals signs.',
  ],
  "too deep a dot path": [
    ["--num.thousand.leagues=10"],
    'Unrecognized argument: "--num.thousand.leagues=10". Too many dots.',
  ],
};

Object.entries(passes).forEach(([name, [args, expected]]) =>
  describe(name, () => {
    test(`> <cmd> ${args.join(" ")}`, () => {
      expect(parseArgs(args)).toMatchObject(expected);
    });
  })
);

describe("throws exceptions on", () => {
  Object.entries(fails).forEach(([name, [args, message]]) => {
    describe(name, () => {
      test(`> <cmd> ${args.join(" ")}`, () => {
        expect(() => parseArgs(args)).toThrow(message);
      });
    });
  });
});
