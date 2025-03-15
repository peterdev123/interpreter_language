import { Token, TokenType } from "./lexer";

export interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
}

export class Parser {
  private pos = 0;
  private tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): ASTNode {
    return this.program();
  }

  private program(): ASTNode {
    let children: ASTNode[] = [];

    while (this.tokens[this.pos].type !== TokenType.EOF) {
      children.push(this.statement());
    }

    return { type: "Program", children };
  }

  private statement(): ASTNode {
    const token = this.tokens[this.pos];

    if (token.type === TokenType.KEYWORD && token.value === "IPAKITA") {
      this.pos++; // Skip IPAKITA
      if (this.tokens[this.pos].type === TokenType.STRING) {
        return { type: "PrintStatement", value: this.tokens[this.pos++].value };
      }
    }

    this.pos++;
    return { type: "Unknown" };
  }
}

