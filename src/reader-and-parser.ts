/// <reference path="text-object.ts" />

module TextObjects {
    export class DefaultReader implements Reader {
        rule(input : string, context : any) : Utils.Cons {

            return new Utils.Cons(false, null);
        }

        read(input : string) : Utils.List<TextObject> {


            return new Utils.List(new_plain_text(""), null);
        }
    }

    export class DefaultParser implements Parser {
        rule(intput : TextObject, context : any) : Type{

            return TextType;
        }

        parse(input : Utils.List<TextObject>) : Utils.List<TextObject> {
            return input;
        }
    }
}
