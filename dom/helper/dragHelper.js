(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../plugins/jquery", "../../functions"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../plugins/jquery"), require("../../functions"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery, global.functions);
    global.dragHelper = mod.exports;
  }
})(this, function (_exports, _jquery, _functions) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = DragHelper;
  _jquery = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  //드래그
  var pointerParse = function pointerParse(_ref) {
    var clientX = _ref.clientX,
        clientY = _ref.clientY;
    return {
      x: clientX,
      y: clientY
    };
  };

  function DragHelper(element, option) {
    var $element = (0, _jquery.default)(element).eq(0);
    var delegates = [];
    var startFn;
    var moveFn;
    var endFn;
    var dragParams = null;
    var firstDrag = null;
    var lastDrag = null;

    var resetOptions = function resetOptions() {
      var delegate = function delegate(delegateElement) {
        (0, _jquery.default)(delegateElement).each(function () {
          delegates.push(this);
          (0, _jquery.default)(this).css("pointer-events", "none");
        });
      };

      var getOptions = (0, _functions.rebase)(typeof option === "function" ? option({
        element: $element,
        delegate: delegate
      }) : option);
      startFn = getOptions["start"];
      moveFn = getOptions["move"];
      endFn = getOptions["end"];
    };

    var getCurrentPointerDrag = function getCurrentPointerDrag(originalEvent) {
      var pointerDrag = pointerParse(originalEvent); //현재 이동한 거리

      pointerDrag.moveX = pointerDrag.x - lastDrag.x;
      pointerDrag.moveY = pointerDrag.y - lastDrag.y; //처음으로부터 변경된 거리

      pointerDrag.offsetX = pointerDrag.x - firstDrag.x;
      pointerDrag.offsetY = pointerDrag.y - firstDrag.y; //처음으로 부터 변경되어 엘리먼트 오프셋 크기

      pointerDrag.leftValue = dragParams.offset.left + pointerDrag.offsetX;
      pointerDrag.topValue = dragParams.offset.top + pointerDrag.offsetY;
      pointerDrag.left = pointerDrag.leftValue + "px";
      pointerDrag.top = pointerDrag.topValue + pointerDrag.offsetY + "px";
      return pointerDrag;
    };

    var dragEnter = function dragEnter(_ref2) {
      var originalEvent = _ref2.originalEvent;
      //init
      resetOptions(); //

      var elementOffset = $element.predict();
      var pointerDrag = pointerParse(originalEvent);
      firstDrag = pointerDrag;
      lastDrag = pointerDrag;
      dragParams = {
        offset: elementOffset,
        pointer: undefined,
        event: originalEvent
      };
      dragParams.pointer = getCurrentPointerDrag(originalEvent);
      startFn && startFn(dragParams);
      (0, _jquery.default)(document).on("mousemove", dragMove).on("mouseup", dragExit);
      (0, _jquery.default)("body").attr("dragging", "");
    };

    var dragMove = function dragMove(_ref3) {
      var originalEvent = _ref3.originalEvent;
      var pointerDrag = pointerParse(originalEvent);

      if (!moveFn) {
        lastDrag = pointerDrag;
        return;
      } else {
        dragParams.pointer = getCurrentPointerDrag(originalEvent);
        dragParams.event = originalEvent;
        moveFn(dragParams);
        lastDrag = pointerDrag;
      }
    };

    var dragExit = function dragExit(_ref4) {
      var originalEvent = _ref4.originalEvent;
      dragParams.pointer = getCurrentPointerDrag(originalEvent);
      dragParams.event = originalEvent;
      endFn && endFn(dragParams);
      dragParams = undefined;
      (0, _jquery.default)(document).off("mousemove", dragMove).off("mouseup", dragExit);
      (0, _jquery.default)("body").removeAttr("dragging");
    };

    $element.on("mousedown", dragEnter);
    return $element;
  }
});
//# sourceMappingURL=dragHelper.js.map