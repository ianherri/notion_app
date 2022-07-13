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

// add child block given block_id

router.patch('/', async (req, res) => {
  let id = req.query.id
  await createNewBlock(req.body.content, id)
  res.status(201).send()
})

async function createNewBlock(content, id) {
  const blockId = id
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        paragraph: {
          rich_text: [
            {
              text: {
                content: `${content} [added via SMS]`,
              },
              annotations: {
                bold: false,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'green',
              },
            },
          ],
        },
      },
    ],
  })
  console.log(response)
}

module.exports = router
