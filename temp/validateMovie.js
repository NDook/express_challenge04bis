//validation avec JOI

const Joi = require('joi');

const movieShema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(1)
        .max(255)
        .required(),

    director: Joi.string()
        .alphanum()
        .min(1)
        .max(255)
        .required(),

    year: Joi.number()
        .integer()
        .min(1800)
        .max(2050)
        .required(),

    color: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required(),
    
    duration: Joi.number()
        .integer()
        .min(0)
        .max(500)
        .required(),
})


const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    
    const { error }= movieShema.validate(
        { title, director, year, color, duration },
        {abordEarly: false}
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
}

module.exports = { 
    validateMovie
};