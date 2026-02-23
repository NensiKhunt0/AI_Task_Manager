const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: "AIzaSyAutMjUS4Zv1KDgrQJ7pH4SNl-14kB_rIw" });

async function test() {
    const models = await ai.models.list();
    console.log(models);
}

test();