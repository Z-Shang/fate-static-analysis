/// <reference path="../src/text-object.ts" />
/// <reference path="../src/reader-and-parser.ts" />
/// <reference path="../src/utils.ts" />

//This is just a simple reader and parser impelementation of a lisp-like language with limited standard functions

class SimpleLispReader implements TextObjects.Reader {
    rule(input : string, context : any) : boolean {

        return false;
    }

    read(input : string) : Utils.List<TextObjects.TextObject> {

        return new Utils.List(TextObjects.new_plain_text(""), null);
    }

}

class SimpleLispParser implements TextObjects.Parser {
    rule(intput : TextObjects.TextObject, context : any) : TextObjects.Type{

        return TextObjects.TextType;
    }

    parse(input : Utils.List<TextObjects.TextObject>) : Utils.List<TextObjects.TextObject> {

        return input;
    }
}
