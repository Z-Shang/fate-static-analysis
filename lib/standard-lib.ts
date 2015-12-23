/// <reference path="../src/text-object.ts" />
/// <reference path="../src/utils.ts" />

module Library {
    export function gen_lib_with_type(lst : Utils.List<string>, t : TextObjects.Type) : Utils.List<TextObjects.TextObject> {
        return lst.map_head(function(s) { return new TextObjects.TextObject(s, t); });
    }
}
