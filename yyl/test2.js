



/**
 * 对当前节点
 * 替换文本
 * 重新设置属性
 * 删除当前节点
 * replace当前节点
 * 
 * 对children
 * 删除节点
 * 插入节点
 * 调整节点顺序(删除和插入)
 * 
 * 对children的插入和删除都算在父节点的patch上。
 * 
 
 * 
 * 整个diff过程 
 * 从oldTree根节点开始， 单个节点的遍历
 * 如果newTree 不存在这个节点 则删除该节点
 * 如果节点tag不同 则直接替换
 * 如果节点tag相同 key相同  则props patch
 * 
 * children
 * 如果旧的没有新的有， 则直接添加
 * 
 * 如果旧的有 新的没有 则直接删除
 * 
 * 如果都有进行child diff
 * 
 var oldlist = [1,2,3];
var newlist = [4,3,2];

// 先遍历old 如果new没有的则删除 例如删除1

oldlist = [2,3];
newlist = [4,3,2];

// 再遍历newlist  如果没有则插入，如果有则调整顺序。
// 其实目的是通过操作将old变成new 但是要记录这个过程中操作的过程

* 然后对oldChild进行调整 调整后再遍历进行递归
所有patch之后   oldTree会变化，但是 patch的时候对应的真实dom tree还是最初的结构，所有再经过同样的步骤就可以。
 * 
 * 
 */