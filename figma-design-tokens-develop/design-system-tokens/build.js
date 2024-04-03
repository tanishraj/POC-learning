const StyleDictionary = require("style-dictionary");

// StyleDictionary.registerTransform({
//   name: "typography/css",
//   type: "attribute",
//   matcher: (token) => {
//     return ["typography", "boxShadow"].includes(token.type);
//   },
//   transformer: function (token) {
//     console.log("\n\n#*#*#*#*#*#*#*#*#*#*#\n", token);
//     let temp = token.value;
//     switch (token.type) {
//       case "typography":
//         token.value = `${temp.fontWeight} ${temp.fontSize}/${temp.lineHeight} ${temp.fontFamily}`;
//         break;

//       case "boxShadow":
//         token.value = token.value.map(
//           (item) =>
//             `${item.x} ${item.y} ${item.spread} ${item.blur} ${item.color} `
//         );
//         break;

//       default:
//         return token;
//     }

//     return token;
//   },
// });

const config = {
  source: ["output.json"],
  platforms: {
    web: {
      transformGroup: "css",
      outputReferences: true,
      buildPath: "build/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        },
        // {
        //   destination: "color.css",
        //   format: "css/variables",
        //   filter: {
        //     type: "color",
        //   },
        // },
        // {
        //   destination: "size.css",
        //   format: "css/variables",
        //   filter: {
        //     type: "dimension",
        //   },
        // },
        // {
        //   destination: "spacing.css",
        //   format: "css/variables",
        //   filter: {
        //     type: "spacing",
        //   },
        // },
        // {
        //   destination: "typography.css",
        //   format: "css/variables",
        //   filter: {
        //     type: "typography",
        //   },
        // },
      ],
    },
  },
};

const StyleDictionaryExtended = StyleDictionary.extend(config);
StyleDictionaryExtended.cleanAllPlatforms();
StyleDictionaryExtended.buildAllPlatforms();
