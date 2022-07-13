function selectRandomIndex(list) {
  let i = Math.floor(Math.random() * list.length)
  return i
}

function isParagraph(block) {
  if (block.type == 'paragraph' && block.paragraph.rich_text.length > 0) {
    return true
  }
  return false
}

function filterForNonEmptyText(page) {
  if (page.length == 0) {
    const dummyContent = [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              text: {
                content: 'no content',
              },
            },
          ],
        },
      },
    ]
    return dummyContent
  } else {
    return page
  }
}

export { selectRandomIndex, isParagraph, filterForNonEmptyText }
