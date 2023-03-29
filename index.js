const {
    ArtEngine,
    inputs,
    generators,
    renderers,
    exporters,
} = require('@hashlips-lab/art-engine')

const BASE_PATH = __dirname;

const ae = new ArtEngine({
    cachePath: `${BASE_PATH}/cache`,
    outputPath: `${BASE_PATH}/output`,
    inputs: {
        apes : new inputs.ImageLayersInput({
          assetsBasePath: `${BASE_PATH}/data`,
        }),
    },

    generators: [
        new generators.ImageLayersAttributesGenerator({
            dataSet: "apes",
            startIndex: 1,
            endIndex: 5
        }),
    ],

    renderers: [
        new renderers.ItemAttributesRenderer({
            name: (itemUid) => `Eye ${itemUid}`,
            description: (attributes) => {
                return `This is a token with "${attributes["Background"][0]}" as Background`;
            },
        }),
        new renderers.ImageLayersRenderer({
            width: 512,
            height: 512,
        }),
    ],
    exporters: [new exporters.ImagesExporter(),
    new exporters.Erc721MetadataExporter({
        imageUriPrefix: "ipfs://__CID__/",
    })
  ],
});

(async ()=> {
    await ae.run();
    ae.printPerformance();
})();