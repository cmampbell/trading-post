import readCard from "./readCard";

jest.mock("tesseract.js", () => ({
    ...jest.requireActual("tesseract.js"),
    createWorker: () => ({
        loadLanguage: jest.fn(),
        initialize: jest.fn(),
        setParameters: jest.fn(),
        recognize: async (image) => ({
            data: {
                symbols: [
                    {
                        text: 'H', confidence: 0, word: {
                            text: 'H'
                        }
                    },
                    {
                        text: ' ', confidence: 0, word: {
                            text: ' Test '
                        }
                    },
                    {
                        text: 'T', confidence: 99, word: {
                            text: ' Test '
                        }
                    },
                    {
                        text: 'e', confidence: 99, word: {
                            text: ' Test '
                        }
                    },
                    {
                        text: 's', confidence: 99, word: {
                            text: ' Test '
                        }
                    },
                    {
                        text: 't', confidence: 99, word: {
                            text: ' Test '
                        }
                    },
                    {
                        text: ' ', confidence: 99, word: {
                            text: ' Test '
                        }
                    },
                    {
                        text: 'C', confidence: 99, word: {
                            text: 'Card '
                        }
                    },
                    {
                        text: 'a', confidence: 99, word: {
                            text: 'Card '
                        }
                    },
                    {
                        text: 'r', confidence: 99, word: {
                            text: 'Card '
                        }
                    },
                    {
                        text: 'd', confidence: 99, word: {
                            text: 'Card '
                        }
                    },
                    {
                        text: ' ', confidence: 0, word: {
                            text: 'Card '
                        }
                    },
                ]
            }
        }),
        terminate: jest.fn()

    })
}));

describe("readCard unit tests", () => {
    it("should return a string", async () => {
        const result = await readCard('mockImage');

        expect(result).toEqual(expect.any(String));
        expect(result).toEqual('Test Card');
    })
})