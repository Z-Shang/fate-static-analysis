/// <reference path="../src/text-object.ts" />
/// <reference path="../src/reader-and-parser.ts" />
/// <reference path="../src/utils.ts" />
/// <reference path="../lib/standard-lib.ts" />

//This is just a simple reader and parser impelementation of a lisp-like language with limited standard functions

class Context {
    in_quote : boolean;
    current : boolean;

    constructor() {
        this.in_quote = false;
        this.current = true;
    }
}

var stdlib = <Utils.List<TextObjects.TextObject>>Library.gen_lib_with_type(<Utils.List<string>>Utils.list("set", "def", "lambda", "cons", "true", "false", "if"), TextObjects.SyntaxType);

class SimpleLispReader implements TextObjects.Reader {
    rule(input : any, context : Context) : Utils.Cons{
        if(input == '\"'){
            context.in_quote = !context.in_quote;
        }
        if(!context.in_quote){
            switch(input){
                case '(':
                case ' ':
                case '\t':
                case '\n':
                    context.current = true;
                    return new Utils.Cons(true, context);
                    break;
                case ')':
                    context.current = false;
                    return new Utils.Cons(true, context);
                    break;
            }
        }
        return new Utils.Cons(false, context);
    }

    read(input : string) : Utils.List<TextObjects.TextObject> {
        console.log("Reading: " + input);
        var context = new Context();
        var result = null;
        var tmp : string = "";
        for(var i = 0; i < input.length; i++){
            let t = this.rule(input.charAt(i), context);
            if(t.head){
                if(t.tail.current){
                    tmp += input.charAt(i);
                }
                if(result == null){
                    result = new Utils.List(TextObjects.new_plain_text(tmp), null);
                }else{
                    result = (<Utils.List<TextObjects.TextObject>>result).add_back(TextObjects.new_plain_text(tmp));
                }
                if(t.tail.current){
                    tmp = "";
                }else{
                    tmp = input.charAt(i);
                }
            }else{
                tmp += input.charAt(i);
            }
            context = t.tail;
        }
        if(tmp != ""){
            result = result.add_back(TextObjects.new_plain_text(tmp));
        }
        return result;
    }

}

class SimpleLispParser implements TextObjects.Parser {
    rule(input : TextObjects.TextObject, context : any) : TextObjects.Type{
        if(stdlib.filter(function(o) { return o.value == input.value; }) != null){
            return TextObjects.SyntaxType;
        }else{
            if(input.value == '(' || input.value == ')'){
                return TextObjects.ParenthesisType;
            }
            return TextObjects.SymbolType;
        }
    }

    parse(input : Utils.List<TextObjects.TextObject> | void) : Utils.List<TextObjects.TextObject> {
        var context = new Context();
        if(input == null){
            return null;
        }else{
            return new Utils.List<TextObjects.TextObject>(new TextObjects.TextObject((<Utils.List<TextObjects.TextObject>>input).head.value, this.rule((<Utils.List<TextObjects.TextObject>>input).head, context)), this.parse((<Utils.List<TextObjects.TextObject>>input).tail));
        }
    }
}

let testReader = new SimpleLispReader();
let testParser = new SimpleLispParser();
let result = testReader.read("(asd test)");
result.map_head(function(o) { console.log(o.to_string()); });
let presult = testParser.parse(result);
presult.map_head(function(o) { console.log(o.to_string()); });
