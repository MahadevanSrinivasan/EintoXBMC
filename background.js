// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when a message is passed.  We assume that the content script
// wants to show the page action.
var videoLink;
function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.
  chrome.pageAction.show(sender.tab.id);
  videoLink = request.msg[1];
  console.log(videoLink);
  
  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

chrome.pageAction.onClicked.addListener(function() {
  var address = 'http://192.168.1.114/jsonrpc';
  var data = {};
  data.jsonrpc = "2.0";
  data.id = 1;
  data.method = "Player.Open";
  data.params = {};
  data.params.item = {};
  data.params.item.file = videoLink;
  $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(data),
        url: address,
        success: function(sdata){
        console.log(sdata);
        }
    });
});