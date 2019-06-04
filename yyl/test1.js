var diff = require('list-diff2');


var before = [{id: 'id_1'}, {id: 'id_2'}, {id: 'id_3'}, {id: 'id_4'}, {id: 'id_5'}, {id: 'id_6'}]
var after = [{id: 'id_3'}, {id: 'id_2'}, {id: 'id_1'}, {id: 'id_7'}]
debugger
var diffs = diff(before, after, 'id')
debugger
console.log(diffs)