import picocli from "./";

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
  "equals sign starts flag": [
    ["--=jkhsd"],
    {
      "=jkhsd": true,
    },
  ],
  "equals sign is flag": [
    ["--="],
    {
      "=": true,
    },
  ],
  "equals sign flag does no assignment": [
    ["--==gnk"],
    {
      "==gnk": true,
    },
  ],
  json: [
    ["--hoop=doop", '--floop={"zoop":[5]}'],
    {
      hoop: "doop",
      floop: {
        zoop: [5],
      },
    },
  ],
};

Object.entries(passes).forEach(([name, [args, expected]]) =>
  describe(name, () => {
    test(`> <cmd> ${args.join(" ")}`, () => {
      expect(picocli(args)).toMatchObject(expected);
    });
  })
);
