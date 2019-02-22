module.exports = {
    
    addBreak : function (breakSeconds) {
        return `<break time="${breakSeconds}s"/>`;
    }
/*
    replaceAudioTag : function (originalString, beginningOfDeletedPart) {
        var result = originalString.substring(beginningOfDeletedPart);
        return result;
    }*/
}