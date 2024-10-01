// npm i (module) --no-bin-links

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require("fs")
const {getBuffer, axios} = require("./config")
const fetch = require("node-fetch");
const texpro1 = require("./lib/textpro");
const TelegraPh = require("./lib/telegra")
module.exports = {
express,
cors,
path,
fs,
getBuffer,
axios,
fetch,
texpro1,
TelegraPh
}