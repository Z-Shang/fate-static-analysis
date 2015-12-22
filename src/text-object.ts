/// <reference path="utils.ts" />

module TextObjects {
    export class Type {
        name : string;
        style : string;
        extend : Type | void;

        constructor(name : string, style : string, extend : Type | void){
            this.name = name;
            this.style = style;
            this.extend = extend;
        }
    }

    export var TextType = new Type("Text", "text_plain", null);

    export var SymbolType = new Type("Symbol", "text_symbol", TextType);

    export var VariableType = new Type("Variable", "symbol_variable", SymbolType);

    export var ConstantTypr = new Type("Constant", "symbol_constant", SymbolType);

    export var FunctionType = new Type("Function", "symbol_function", SymbolType);

    export var KeywordType = new Type("Keyword", "text_keyword", TextType);

    export var SyntaxType = new Type("Syntax", "syntax_plain", null);

    export var OperatorType = new Type("Operator", "syntax_operator", SyntaxType);

    export var ReserveType = new Type("Reserve", "syntax_reserve", SyntaxType);

    export var ParenthesisType = new Type("Parenthesis", "syntax_parenthesis", SyntaxType);

    export var BracketType = new Type("Bracket", "syntax_bracket", SyntaxType);

    export var BraceType = new Type("Brace", "syntax_brace", SyntaxType);

    export var PointyType = new Type("Pointy", "syntax_pointy", SyntaxType);

    export var TerminalType = new Type("Terminal", "syntax_terminal", SyntaxType);

    export var EqualityType = new Type("Equality", "syntax_equality", SyntaxType);

    export var NumberType = new Type("Number", "number_plain", null);

    export var IntegerType = new Type("Integer", "number_integer", NumberType);

    export var FloatType = new Type("Float", "number_float", NumberType);

    export var StringType = new Type("String", "string_plain", null);

    export var DoubleStringType = new Type("Double Quoted String", "string_double", StringType);

    export var SingleStringType = new Type("Single Quoted String", "string_single", StringType);

    export var CommentType = new Type("Comment", "text_comment", TextType);

    export class TextObject {
        object_type : Type;
        value : any;

        constructor(t : Type, v : any){
            this.object_type = t;
            this.value = v;
        }
    }

    export function new_plain_text(v : string) : TextObject {
        return new TextObject(TextType, v);
    }

    //A dummy type for the interface : TextBlock
    interface RenderType {
        () : void;
    }

    export class StyleRule {
        name : string;

    }

    export interface ReaderRule {
        (input : string, context : any) : boolean;
    }

    export interface ReaderFn {
        (intput : string) : Utils.List<TextObject>;
    }

    export interface Reader {
        rule : ReaderRule;
        read : ReaderFn;
    }

    export interface ParserRule {
        (input : TextObject, context : any) : Type;
    }

    export interface ParserFn {
        (input : Utils.List<TextObject>) : Utils.List<TextObject>;
    }

    export interface Parser {
        rule : ParserRule;
        parse : ParserFn;
    }
}
