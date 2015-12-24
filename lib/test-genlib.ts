/// <reference path="standard-lib.ts" />
/// <reference path="../src/text-object.ts" />
/// <reference path="../src/utils.ts" />

let testLst = new Utils.List<string>("let", null);
testLst = testLst.add_front("var");
testLst = testLst.add_front("function");

console.log(testLst.to_string());

(<Utils.List<TextObjects.TextObject>>Library.gen_lib_with_type(testLst, TextObjects.SyntaxType)).map_head(function (o) { console.log(o.to_string()); });
