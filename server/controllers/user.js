const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password} = req.body
        const existingUser = await db.user.find_user_by_username([username])
        if(existingUser[0]) {
            return res.status(409).send('Username already taken')
        }
        const profilePic = 'https://robohash.org/${username}.png'
        const salt = bcrypt.genSaltSync(5)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = await db.user.create_user([username, hashedPassword, profilePic])

        req.session.user = {
            id: user[0].id,
            username: user[0].username,
            profilePic: user[0].profile_pic
        }
        console.log("getting here")
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const user = await db.user.find_user_by_username([username])
        if(!user[0]) {
            return res.status(401).send('User not found')
        }

        const isAuthenticated = bcrypt.compareSync(password, user[0].password)
        if(!isAuthenticated) {
            return res.status(403).send('Incorrect password')
        }
        
        req.session.user = {
            id: user[0].id,
            username: user[0].username,
            profilePic: user[0].profile_pic
        }
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        req.app.get('db').user.find_user_by_username(req.session.username).then(user => {
            res.status(200).send(user[0])
        })
    }
}