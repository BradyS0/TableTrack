// made using chatGPT
// this file translates modern JS to older JS for compatibility
// really only used for jest testing with ES modules
module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }]
    ]
};
