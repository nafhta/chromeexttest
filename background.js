// Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
// source code is governed by a BSD-style license that can be found in the
// LICENSE file.


/**
* Stores a state every time an "active" event is sent, up to 20 items.
*
* Opens history.html when the browser action is clicked.
* Used window.open because I didn't want the tabs permission.
*/
chrome.browserAction.onClicked.addListener(function() 
{
  window.open('index.html', 'Historia sin conexión', 'width=1000,height=600');
});
