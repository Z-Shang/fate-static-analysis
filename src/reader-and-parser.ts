/// <reference path="text-object.ts" />

module TextObjects {
    export class DefaultReader implements Reader {
        rule(input : string) : boolean {

            return false;
        }

        read(input : string) : Utils.List<TextObject> {


            return new Utils.List(new_plain_text(""), null);
        }
    }

    export class DefaultParser implements Parser {
        rule(intput : TextObject) : Type{

            return TextType;
        }

        parse(input : Utils.List<TextObject>) : Utils.List<TextObject> {
            return input;
        }
    }
}
