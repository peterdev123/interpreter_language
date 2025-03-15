export enum TokenType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  IDENTIFIER = "IDENTIFIER",
  KEYWORD = "KEYWORD",
  SYMBOL = "SYMBOL",
  OPERATOR = "OPERATOR",
  BOOLEAN = "BOOLEAN",
  EOF = "EOF"
}

export interface Token {
  type: TokenType;
  value: string;
}

const keywords = new Set(["SUGOD", "KATAPUSAN", "MUGNA", "IPAKITA", "DAWAT", "KUNG", "ALANG", "PUNDOK", "UG", "O", "DILI"]);

export class Lexer {
  private pos = 0;
  private tokens: Token[] = [];

  constructor(private code: string) {}

  tokenize(): Token[] {
    const words = this.code.split(/\s+/);

    for (let word of words) {
      if (keywords.has(word)) {
        this.tokens.push({ type: TokenType.KEYWORD, value: word });
      } else if (!isNaN(Number(word))) {
        this.tokens.push({ type: TokenType.NUMBER, value: word });
      } else if (word.startsWith("'") && word.endsWith("'")) {
        this.tokens.push({ type: TokenType.STRING, value: word });
      } else {
        this.tokens.push({ type: TokenType.IDENTIFIER, value: word });
      }
    }

    this.tokens.push({ type: TokenType.EOF, value: "" });
    return this.tokens;
  }
}
