require('dotenv').config()
const fs = require('fs')
const ejs = require('ejs')
const axios = require('axios')

const fetchFormSubmissions = async function () {
  let page = 1
  const discussions = []
  while (page) {
    try {
      const response = await axios.get(`https://api.netlify.com/api/v1/forms/${process.env.NETLIFY_FORM_ID}/submissions?access_token=${process.env.NETLIFY_TOKEN}&per_page=1&page=${page}`)
      response.data.forEach(function (item) {
        const data = Object.assign({}, item.data, {
          id: item.id,
          number: item.number
        })
        discussions.push(data)
      })
      console.log(response.headers)
      if (discussions.length >= Number(response.headers.total)) {
        page = 0
      } else {
        page++
      }
    } catch (error) {
      console.error(error)
    }
  }

  console.log(discussions)
  return discussions
}

const renderPages = async function () {
  const discussions = await fetchFormSubmissions()

  const discussionDir = './dist/d'
  if (!fs.existsSync(discussionDir)) {
    fs.mkdirSync(discussionDir, { recursive: true })
  }

  // build index.html
  const indexPageString = fs.readFileSync('./templates/index.html.ejs', 'utf-8')
  const indexPage = ejs.render(indexPageString, {
    forum: {
      name: process.env.FORUM_NAME
    },
    discussions
  })
  console.log(indexPage)
  fs.writeFileSync('./dist/index.html', indexPage, 'utf8')

  // build submit.html
  const submitPageString = fs.readFileSync('./templates/submit.html.ejs', 'utf-8')
  const submitPage = ejs.render(submitPageString, {
    forum: {
      name: process.env.FORUM_NAME
    }
  })
  console.log(submitPage)
  fs.writeFileSync('./dist/submit.html', submitPage, 'utf8')

  // build discussion pages
  const discussionPageString = fs.readFileSync('./templates/discussion.html.ejs', 'utf-8')
  discussions.forEach(function (discussion) {
    const discussionPage = ejs.render(discussionPageString, {
      forum: {
        name: process.env.FORUM_NAME
      },
      discussion,
      discussBot: {
        siteId: process.env.DISCUSSBOT_SITE_ID,
        limit: process.env.DISCUSSBOT_COMMENTS_LIMIT
      }
    })
    console.log(discussionPage)
    fs.writeFileSync(`./dist/d/${discussion.number}.html`, discussionPage, 'utf8')
  })
}

renderPages()
