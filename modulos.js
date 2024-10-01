// npm i (module) --no-bin-links

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require("fs")
const {getBuffer, axios} = require("./config")
const fetch = require("node-fetch");
module.exports = {
express,
cors,
path,
fs,
getBuffer,
axios,
fetch,
}
