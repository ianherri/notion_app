/*
This is one of our routes and it basically defines what the API at this route actually does
it is referenced by server/index.js
*/

require('dotenv').config()

const { Client } = require('@notionhq/client')

const express = require('express')

const router = express.Router()

const databaseId = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: process.env.NOTION_KEY })

// get pages

router.get('/', async (req, res) => {
  const pages = await loadAllNotionPages()
  res.send(await pages.results)
})

// add page
// receives data from an http req (req variable) and then calls the
// createNewpage function which communicates with our backend.
// then responds to the requestor with a status

router.post('/', async (req, res) => {
  // for some reason the request is an object with the actual value i want to transmit as they key, and an empty string value like this {'thing I want to send': ''}
  console.log(`from router.post ${req.body}`)
  await createNewPage(req.body.content)
  res.status(201).send()
})

async function loadAllNotionPages() {
  const response = await notion.databases.query({
    database_id: databaseId,

    filter: {
      property: 'Author',
      multi_select: {
        contains: 'Ian Herrington',
      },
    },
    sorts: [],
  })
  return response
}

async function createNewPage(title) {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              // error here?
              content: title,
              link: null,
            },
          },
        ],
      },
      Author: {
        type: 'multi_select',
        multi_select: [
          {
            id: 'e5770796-2ba6-4448-a448-732c1c7d973d',
            name: 'Ian Herrington',
            color: 'green',
          },
        ],
      },
    },
  })
  console.log(`from createNewPage ${title}`)
  return response
}

module.exports = router
