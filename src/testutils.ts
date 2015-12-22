/// <reference path="utils.ts" />

var testList = new Utils.List<number>(1, null);
console.log(testList.to_string());
testList = testList.add_front(2);
console.log(testList.to_string());
testList = testList.reverse();
testList = testList.add_back(3);
console.log(testList.to_string());
console.log(testList.map_head(function(n) { return n + 1; }).to_string());
console.log(testList.map_tail(function(n) { return n.length(); }).to_string());
console.log(testList.fold_head(function(a, b) { return a + b; }, 1));
console.log(testList.fold_tail(function(a, b) { console.log(a.to_string()); return a.length() + b; }, 0));

var testMap = new Utils.Map(new Utils.Record("test", 1), null);
console.log(testMap.contains("test"));
console.log(testMap.get_id("test"));
testMap = testMap.add_raw("ttt", 2);
testMap = testMap.add(new Utils.Record("asd", 3));
console.log(testMap.to_string());
