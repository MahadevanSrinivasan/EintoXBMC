/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /'file': '(.+?)'/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerHTML)) {
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({msg:regex.exec(document.body.innerHTML)}, function(response) {});
} else {
  // No match was found.
}
