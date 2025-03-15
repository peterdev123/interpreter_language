import { ASTNode } from "./parser";

export class Interpreter {
  constructor(private ast: ASTNode) {}

  run() {
    this.evaluate(this.ast);
  }

  private evaluate(node: ASTNode) {
    if (node.type === "Program") {
      node.children?.forEach(child => this.evaluate(child));
    } else if (node.type === "PrintStatement") {
      console.log(node.value);
    }
  }
}
