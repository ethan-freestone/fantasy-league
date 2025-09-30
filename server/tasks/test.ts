export default defineTask({
    meta: {
        name: "test",
        description: "Testing task scheduler",
    },
    run({ payload: _payload, context: _context }) {
        console.warn("Running some behind-the-scenes task...");
        return { result: "Success" };
    },
});