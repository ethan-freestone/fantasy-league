export default defineEventHandler((_event) => {
    console.warn("Running some behind-the-scenes task...");
    return { result: "Success" };
})