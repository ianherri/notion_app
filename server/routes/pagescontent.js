/*
This is one of our routes and it basically defines what the API at this route actually does
it is referenced by server/index.js
*/

require('dotenv').config()

const { Client } = require('@notionhq/client')

const express = require('express')

const router = express.Router()

const notion = new Client({ auth: process.env.NOTION_KEY })

// get pages content

router.get('/', async (req, res) => {
  let id = req.query.id
  const pagecontent = await loadPageContent(id)
  res.send(await pagecontent.results)
})

async function loadPageContent(id) {
  const response = await notion.blocks.children.list({
    block_id: id,
    page_size: 50,
  })
  return response
}

module.exports = router
