/// <reference path="utils.ts" />

var testList = new Utils.List<number>(1, null);
console.log(testList.to_string());
testList = testList.add_front(2);
console.log(testList.to_string());
testList = testList.reverse();
testList = testList.add_back(3);
console.log(testList.to_string());
console.log(testList.map_head(function(n) { return n + 1; }).to_string());

var testMap = new Utils.Map(new Utils.Record("test", 1), null);

