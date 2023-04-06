export default (/* istanbul ignore next */ args = process.argv.slice(2)) =>
  args.reduce(
    (flags, arg) => {
      if (arg.startsWith("--")) {
        const equalsPos = arg.indexOf("=");
        const isAssignment = equalsPos > 3;
        const prop = arg
          .slice(2, isAssignment ? equalsPos : arg.length)
          .replaceAll(/-([a-z])/gi, (_, letter) => letter.toUpperCase());
        let value = true;
        if (isAssignment) {
          value = arg.slice(equalsPos + 1);
          try {
            value = JSON.parse(value);
          } catch (e) {
            // accept as a barestring
          }
        }
        flags[prop] = value;
        if (/^no[A-Z]/.test(prop))
          flags[prop[2].toLowerCase() + prop.slice(3)] = !value;
      } else {
        flags._.push(arg);
      }
      return flags;
    },
    { _: [] }
  );
