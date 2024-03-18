"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryPriority = exports.StoryStatus = void 0;
var StoryStatus;
(function (StoryStatus) {
    StoryStatus["PRODUCT"] = "PRODUCT";
    StoryStatus["SPRINT"] = "SPRINT";
    StoryStatus["DONE"] = "DONE";
})(StoryStatus || (exports.StoryStatus = StoryStatus = {}));
var StoryPriority;
(function (StoryPriority) {
    StoryPriority["COULD_HAVE"] = "COULD_HAVE";
    StoryPriority["SHOULD_HAVE"] = "SHOULD_HAVE";
    StoryPriority["MUST_HAVE"] = "MUST_HAVE";
    StoryPriority["WONT_HAVE_THIS_TIME"] = "WONT_HAVE_THIS_TIME";
})(StoryPriority || (exports.StoryPriority = StoryPriority = {}));
