// 引入 wangEditor
import E from 'wangeditor' // npm 安装
// const E = window.wangEditor // CDN 引入的方式

// 获取必要的变量，这些在下文中都会用到
const { BtnMenu } = E

// 【注意】如果版本 <= v4.0.5 需要这样写：
// const { $ } = E
// const { BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E.menuConstructors


export default class AlertMenu extends BtnMenu  {
    isActive = false;
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu">
                <button>测试</button>
            </div>`
        )
        
        super($elem, editor)

    }
    // 菜单点击事件

    clickHandler() {
      this.isActive = !this.isActive

      const editor = this.editor
      let prev = editor.selection.getSelectionText()
      // const isEmptySelection = editor.selection.isSelectionEmpty()
      const $selectionElem = editor.selection.getSelectionContainerElem()?.elems[0]

      console.log("selectionElem", $selectionElem)

      console.log("prev", prev)
      // <p style="-webkit-text-emphasis:dot;-webkit-text-emphasis-position:under;">${prev}</p>
      editor.cmd.do('insertHTML', `
      <p class="test">${prev}</p>`)

      // if (isEmptySelection) { 
      //   console.log("yes")
      //     // 需要将选区范围折叠起来
      //     editor.selection.collapseRange()
      //     editor.selection.restoreSelection()
      // }

    }
    // clickHandler() {
    //     this.isActive = !this.isActive;
    //     const editor = this.editor
    //     const isEmptySelection = editor.selection.isSelectionEmpty()
    //     const $selectionElem = editor.selection.getSelectionContainerElem()?.elems[0]
    //     const isFont = $selectionElem?.nodeName.toLowerCase() !== 'p'
    //     // console.log("eidotr", editor,editor.txt.html())
    //     // console.log("editor.selection.getSelectionContainerElem(", editor.selection.getSelectionContainerElem())
    //     // console.log("isEmptySelection",isEmptySelection, "selectionElem", $selectionElem, "isFont", isFont)
    //     // console.log(" $selectionElem?.getAttribute('color')",  $selectionElem?.getAttribute('WebkitTextEmphasis'))
    //     // const isSameValue = $selectionElem?.getAttribute('face') === value
    //     if (isEmptySelection) {
    //         if (isFont) {
    //             const $elems = editor.selection.getSelectionRangeTopNodes(editor)
    //             // console.log("$elems ", $elems )
    //             editor.selection.createRangeByElem($elems[0])
    //             editor.selection.moveCursor($elems[0].elems[0])
    //         }
    //         // 插入空白选区
    //         editor.selection.createEmptyRange()
    //     }
    //     // console.log("A", $selectionElem, this.isActive)
    //     if (this.isActive) {
    //       console.log("in");
    //       // style="color:red;background-color:pink;-webkit-text-emphasis:dot;-webkit-text-emphasis-position:under;
    //       editor.cmd.do('insertHTML', `
    //           <div>嘻嘻哈哈</div>
    //       `)
    //       // <span style="-webkit-text-emphasis: dot; -webkit-text-emphasis-position: under;">我们嘻嘻哈哈</span>
    //       // <span style="color:red">嘻嘻哈哈</span>
    //       // $selectionElem.style.WebkitTextEmphasis = "dot";
    //       // $selectionElem.style.WebkitTextEmphasisPosition = "under";
    //     } else {
    //       console.log("$selectionElem,=====", $selectionElem)
    //       // $selectionElem.style.WebkitTextEmphasis = "";
    //       // $selectionElem.style.WebkitTextEmphasisPosition = "";
    //     }
    //     // console.log("B")
        // if (isEmptySelection) {
        //   console.log("C")
        //     // 需要将选区范围折叠起来
        //     editor.selection.collapseRange()
        //     editor.selection.restoreSelection()
        // }
    //     console.log("D")
    // }
    // 菜单是否被激活（如果不需要，这个函数可以空着）
    // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
    // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
    tryChangeActive() {
        // 激活菜单
        // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
        // 2. this.this.isActive === true
        // this.active()
        // const editor = this.editor

        // console.log("his.this.isActive ", this.isActive)

        // console.log("===",editor.cmd,editor.cmd.queryCommandState('textEmphasis'))
        // if (editor.cmd.queryCommandState('bold')) {
        //     this.active()
        // } else {
        //     this.unActive()
        // }

        // // 取消激活菜单
        // // 1. 菜单 DOM 节点会删掉 .w-e-active
        // // 2. this.this.isActive === false
        // this.unActive()
    }
}