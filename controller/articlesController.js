const userModel = require('../model/userModel')
const articleModel = require('../model/articleModel')

const validator = require('../validation/validator')


const addarticle = async function (req, res) {
    try {

        const { title, body, Description } = req.body;

        const userId = req.params.userId
        // const websiteId = req.params.websiteId
        if (!validator.isValidRequestBody(req.body)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide website details' })
            return
        }
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, message: ' Please provide valid title' })
        }
        if (!validator.isValid(body)) {
            return res.status(400).send({ status: false, message: 'Excerpt is required' })
        }

        if (!validator.isValid(Description)) {
            return res.status(400).send({ status: false, message: "please Provide valid Description." });
        }
        const Admin = await userModel.findOne({ userId })

        if (!Admin) {
            return res.status(400).send('Admin not found')
        }
        const articleDetails = await articleModel.create(req.body)

        return res.status(201).send({ status: true, message: 'Success', data: articleDetails });
    }

    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Server Error' })
    }
}


const getarticlebyId = async function (req, res) {
  
    try {
        const filterQuery = { isDeleted: false }
        const queryParams = req.query;

        if (validator.isValidRequestBody(queryParams)) {
            const { userId, title } = queryParams;

            if (validator.isValid(userId) && isValidObjectId(userId)) {
                filterQuery[ 'userId' ] = userId
            }

            if (validator.isValid(title)) {
                filterQuery[ 'webname' ] = title.trim()
            }
  }

        const articles = await articleModel.find(filterQuery).sort({ title: 1 })

        if (Array.isArray(articles) && articles.length === 0) {
            return res.status(404).send({ status: false, message: 'No articles found' })
        }

        return res.status(200).send({ status: true, message: 'articles list', data: articles })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}





module.exports.addarticle = addarticle
module.exports.getarticlebyId= getarticlebyId