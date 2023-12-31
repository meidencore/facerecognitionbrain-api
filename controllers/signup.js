const handleSignup = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password, 8);
    db.transaction(trx => {
        trx.insert({
            hash,
            email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name,
                joined: new Date()    
            })
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)   
    })
    .catch(err => res.status(400).json('unable to signup'))
}

export default handleSignup